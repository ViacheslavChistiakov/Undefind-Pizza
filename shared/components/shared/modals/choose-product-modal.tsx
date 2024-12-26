'use client';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelation } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

type Props = {
  product: ProductWithRelation;
  className?: string;
};

export const ChooseProductModals: React.FC<Props> = ({ className, product }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

  // const onAddProduct = () => {
  //   addCartItem({
  //     productCartItemId: firstItem.id,
  //   });
  // };

  // const onAddPizza =  (productCartItemId: number, ingredients: number[]) => {
  // addCartItem({
  //       productCartItemId,
  //       ingredients,
  //     });

  // };

  const onSubmit = async (productCartItemId?: number, ingredients?: number[]) => {
    try{
      const itemId = productCartItemId ?? firstItem.id;
      
      await addCartItem({
        productCartItemId: itemId,
        ingredients,
      })

      toast.success(`${product.name} been added to cart`);
      router.back();
    } catch (err) {
      toast.error(`Failed to add ${product.name} to cart`);
      console.error(err);
    }
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onSubmit}
            price={firstItem.price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
