import { axiosInstance } from "./instance"
import { CartDTO, CreateCartItemsValues } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
    return (await axiosInstance.get<CartDTO>('/cart')).data;
}

export const updateCartItemQuanity = async (itemId: number, quanity: number): Promise<CartDTO> => {
    return (await axiosInstance.patch<CartDTO>(`/cart/` + itemId, { quanity })).data;
}

export const addCartItem = async (values: CreateCartItemsValues): Promise<CartDTO> => {
    return (await axiosInstance.post<CartDTO>('/cart', values)).data;
}

export const deleteCartItem = async (id: number): Promise<CartDTO> => {
    return (await axiosInstance.delete<CartDTO>(`/cart/` + id)).data;
}