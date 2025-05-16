'use client';

import { createOrder } from '@/app/actions';
import { useCart } from '@/app/hooks';
import { CheckoutSidebar, Container, Title } from '@/shared/components/shared';
import {
  CheckoutCart,
  CheckoutData,
  CheckoutDelivery,
  checkoutFormSchema,
} from '@/shared/components/shared/checkout';
import { TypeCheckoutFormValues } from '@/shared/constants/checkout-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, updateItemsQuantity, cartItems, removeCartItem, loading } = useCart();

  const onSubmit = async (data: TypeCheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.error("Order has been created", {
        icon: '✅',
      });
      if (url) {
        location.href = url;
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      toast.error("Error creating order", {
        icon: '❌',
      });
    } 
  };

  const form = useForm<TypeCheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  return (
    <Container className="mt-10">
      <Title text="Checkout" className="font-extrabold mb-8 text-[36px]" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Left Side */}
            <div className="flex flex-col gap-10  flex-1 mb-20">
              <CheckoutCart
                cartItems={cartItems}
                updateItemsQuantity={updateItemsQuantity}
                removeCartItem={removeCartItem}
                loading={loading}
              />
              <CheckoutData className={loading ? "opacity-40 pointer-events-none" : ""} />
              <CheckoutDelivery className={loading ? "opacity-40 pointer-events-none" : ""} />
            </div>
            {/* Right Side */}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount}  loading={loading || submitting}/>
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
