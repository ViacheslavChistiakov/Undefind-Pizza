import { ProductItem } from "@prisma/client";
import {  pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variant";


export const GetAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]): Variant[] => {
    const filterdPizzasByType = items.filter((item) => item.pizzaType === type);
    
    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filterdPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value))
    }))
}