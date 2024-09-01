import { useRouter, useSearchParams } from "next/navigation";
import { useFilterIngredients } from "./use-filter-Ingredients";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
    priceFrom?: number,
    priceTo?: number
  }
  



export interface QueryFilters extends PriceProps{
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
  }

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps;

}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number ) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;

}




export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    const [selectedIngredients, { toggle: toggleIngredients}] = useSet(new Set<string>(
        searchParams.get('ingredients')?.split(','))
    );

    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : [])
    );
    const [pizzaTypes, { toggle: togglePizaaTypes }] = useSet(
        new Set<string>(searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [])
    );

    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    const updatedPrice = (name: keyof PriceProps, value: number ) => {
        setPrices(prev => ({
          ...prev,
          [name]: value
        }))
      };


    return {
        sizes,
        pizzaTypes,
        prices,
        selectedIngredients,
        setPrices: updatedPrice,
        setPizzaTypes: togglePizaaTypes,
        setSizes: toggleSizes,
        setSelectedIngredients: toggleIngredients
    }

}