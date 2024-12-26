import { Ingredient, ProductItem } from "@prisma/client"
import { PizzaSize, PizzaType } from "../constants/pizza"

/** 
    Calculate the total price of the pizza
    @param type - pizza type
    @param size - pizza size
    @param items - list of pizza items
    @param ingredients - list of ingredients
    @param selectedIngredients - selected ingredients
    @returns total price of the pizza

    @returns total price of the pizza
*/

export const CalcTotalPizzasPrice = (
    type: PizzaType, 
    size: PizzaSize, 
    items: ProductItem[], 
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
        
    const pizzaPrice = items.find((item) => item.size === size)?.price || 0
    const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0)



    return pizzaPrice + totalIngredientsPrice
}