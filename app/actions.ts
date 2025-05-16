'use server';

import { prisma } from "@/prisma/prisma-client";
import { TypeCheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";


export async function createOrder(data: TypeCheckoutFormValues) {
   try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value
    
    if (!cartToken) {
        throw new Error('Cart Token not found')
    }

    /* Find Cart by Token */
    const userCart = await prisma.cart.findFirst({
        include: {
            user: true,
            cartItems: {
                include: {
                    ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            }
                        }
                }
            }
        },
        where: {
            token: cartToken,
        }
    });
    /* Throw error if it's not exists */
    if (!userCart) {
        throw new Error('Cart has not been found')
    }

    if (userCart?.totalAmount === 0) {
        throw new Error('Cart is empty')
    }
    /* Create Order */
    const order = await prisma.order.create({
        data: {
            token: cartToken,
            fullName: data.firstName + ' ' + data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            comment: data.comment,
            totalAmount: userCart.totalAmount,
            status: OrderStatus.PENDING,
            items: JSON.stringify(userCart.cartItems)

        }
    });
    /* Update Order */
    await prisma.cart.update({
        where: {
            id: userCart.id
        }, 
        data: {
            totalAmount: 0,
        }
    });
    /* Delete items from Order */
    await prisma.cartItem.deleteMany({
        where: {
            cartId: userCart.id
        }
    })

    // TODO Connect service for payment

   } catch (err) {
    console.log(err);
   }
}

