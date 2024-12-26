import { ProductItem, Ingredient } from "@prisma/client";
import { PizzaType, PizzaSize, mapPizzaType } from "../constants/pizza";
import { CalcTotalPizzasPrice } from "./calc-total-pizza-price";


export const getPizzaDetails = (
    type: PizzaType, 
    size: PizzaSize, 
    items: ProductItem[], 
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const totalPrice = CalcTotalPizzasPrice(type, size, items, ingredients, selectedIngredients)
    const textDetails = `${size} sm ${mapPizzaType[type]} dough`;

    return {
        totalPrice,
        textDetails
    }
}