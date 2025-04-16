import { CartStateItem } from '@/shared/lib/get-cart-details';
import { CreateCartItemsValues } from '@/shared/services/dto/cart.dto';
import { useCartStore } from '@/shared/store';
import { Cart, CartItem } from '@prisma/client';
import React from 'react';

type ReturnProps = {
  totalAmount: number;
  cartItems: CartStateItem[];
  loading: boolean;
  updateItemsQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemsValues) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);
  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};
