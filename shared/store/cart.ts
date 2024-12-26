import { create } from "zustand";
import { getCartDetails } from "../lib";
import { Api } from "../services/api-client";
import { CartStateItem } from "../lib/get-cart-details";
import { CreateCartItemsValues } from "../services/dto/cart.dto";




export interface cartState  {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    cartItems: CartStateItem[];

    /* Get items from the cart */
    fetchCartItems: () =>  Promise<void>;

     /* Update quantity of item */
    updateItemsQuantity: (id: number, quantity: number) => Promise<void>;

     /* Add item to the cart */
    addCartItem: (values: CreateCartItemsValues) => Promise<void>;

     /* Remove item from the cart */
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<cartState>((set, get) => ({ 
    cartItems: [],
    error: false,
    loading: true,
    totalAmount: 0,

    fetchCartItems: async () => { 
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.getCart();
            set(getCartDetails(data))
        } catch(error) {
            console.log(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    updateItemsQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.updateCartItemQuanity(id, quantity);
            set(getCartDetails(data))
        } catch(error) {
            console.log(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    addCartItem: async (values: CreateCartItemsValues) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.addCartItem(values);
            set(getCartDetails(data))
        } catch(error) {
            console.log(error, 'STORE ERROR');
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    removeCartItem: async (id: number) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.deleteCartItem(id);
            set(getCartDetails(data))
        } catch(error) {
            console.log(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

}));