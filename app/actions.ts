'use server';

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates";
import { TypeCheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { createPayment, sendEmail } from "@/shared/lib";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";



export async function createOrder(data: TypeCheckoutFormValues) {
   try {

    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) throw new Error('Cart Token not found');
 


    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartItems: {
          include: {
            ingredients: true,
            productItem: { include: { product: true } }
          }
        }
      },
      where: { token: cartToken }
    });

    if (!userCart) throw new Error('Cart has not been found');
    if (userCart.totalAmount === 0) throw new Error('Cart is empty');


    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartItems)
      }
    });
  

 
    await prisma.cart.update({
      where: { id: userCart.id },
      data: { totalAmount: 0 }
    });


    await prisma.cartItem.deleteMany({
      where: { cartId: userCart.id }
    });


    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: 'Оплата заказа #' + order.id
    });


    if (!paymentData) throw new Error('Payment data not found');


    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: paymentData.id }
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail(
      data.email,
      "Just Pay bitch " + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl
      })
    );


    return paymentUrl;

   } catch (err) {
    console.log('[CreateOrder]: Server error', err);
    throw err;
   }
}

