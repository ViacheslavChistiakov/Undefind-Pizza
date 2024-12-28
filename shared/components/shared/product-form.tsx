'use client'

import { ProductWithRelation } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import React from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
  product: ProductWithRelation;
  onSubmit?: VoidFunction;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

    const onSubmit = async (productCartItemId?: number, ingredients?: number[]) => {
          try{
            const itemId = productCartItemId ?? firstItem.id;
            
            await addCartItem({
              productCartItemId: itemId,
              ingredients,
            })
      
            toast.success(`${product.name} been added to cart`);

            _onSubmit?.();
          } catch (err) {
            toast.error(`Failed to add ${product.name} to cart`);
            console.error(err);
          }
        }

  if (isPizzaForm) {
    return (
        <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    )
  } 

  return (
    <ChooseProductForm
    imageUrl={product.imageUrl}
    name={product.name}
    onSubmit={onSubmit}
    price={firstItem.price}
    loading={loading}
  />
)
 
};
