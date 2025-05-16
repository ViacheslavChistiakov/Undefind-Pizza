import React from 'react'
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from '../checkout-item';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';

type Props = {
    cartItems: CartStateItem[];
    updateItemsQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    loading?: boolean;
    className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ className, cartItems, loading, updateItemsQuantity, removeCartItem }) => {
  return (
              <WhiteBlock title="1. Cart" className={className}>
                <div className="flex flex-col gap-5">
                  { 
                    loading ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />):
                    cartItems.map((item) => (
                      <CheckoutItem
                        key={item.id}
                        details={getCartItemDetails(
                          item.ingredients,
                          item.pizzaType as PizzaType,
                          item.pizzaSize as PizzaSize,
                        )}
                        {...item}
                        onClickCountButton={(type) => {
                          const newQuantity = type === 'plus' ? item.quantity + 1 : item.quantity - 1;
                          updateItemsQuantity(item.id, newQuantity);
                        }}
                        onClickRemove={() => removeCartItem(item.id)}
                      />
                    ))}
                </div>
              </WhiteBlock>
  )
}