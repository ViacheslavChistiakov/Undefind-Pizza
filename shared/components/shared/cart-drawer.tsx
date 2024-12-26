'use client';

import React, { useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

type Props = {
  className?: string;
};

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  const [totalAmount, fetchCartItems, cartItems, removeCartItem, updateItemsQuantity] =
    useCartStore((state) => [
      state.totalAmount,
      state.fetchCartItems,
      state.cartItems,
      state.removeCartItem,
      state.updateItemsQuantity,
    ]);

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (id: number, quanity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quanity + 1 : quanity - 1;
    updateItemsQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE] ">
        <SheetHeader>
          <SheetTitle>
            In Cart <span className="font-bold">{cartItems.length}</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto flex-1">
            {cartItems.map((item) => (
            <div key={item.id} className="mb-2">
              <CartDrawerItem
                id={item.id}
                imageUrl={item.imageUrl}
                details={
                  item.pizzaSize && item.pizzaType
                    ? getCartItemDetails(
                        item.ingredients,
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize,
                      )
                    : ''
                }
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                onClickRemove={() => removeCartItem(item.id)}
              />
            </div>
            ))}
          </div>


        <SheetFooter className="-m-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Total
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">{totalAmount}$</span>
            </div>
            <Link href="./cart">
              <Button type="submit" className="w-full h-12 text-base">
                Place an order
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
