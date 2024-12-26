import { cn } from '@/shared/lib/utils';
import { Ingredient, ProductItem } from '@prisma/client';
import React from 'react'
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variant';
import { PizzaSize,  PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { IngredientItem } from './ingredient-item';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/app/hooks/use-pizza-options';

type Props = {
    imageUrl: string;
    name: string;
    ingredients: Ingredient[];
    loading?: boolean;
    items:  ProductItem[];
    onSubmit: (itemId: number, ingredients: number[]) => void;
    className?: string,
}

export const ChoosePizzaForm: React.FC<Props> = ({ 
    name,
    loading,
    items,
    imageUrl,
    ingredients,
    onSubmit,
    className,
 }) => {

    const { size, type, selectedIngredients, availableSizes, currentItemId, setType, setSize, addIngredient} = usePizzaOptions(items);
    const { totalPrice, textDetails } = getPizzaDetails(type, size, items, ingredients, selectedIngredients);


    const hundleClick = () => {
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedIngredients));
        }
    }
  

  return (
    <div className={cn(className, 'flex flex-1')}>

    <PizzaImage imageUrl={imageUrl} size={size} /> 



        <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} className="font-extrabold mb-1" />
                <p className="text-gray-400">{textDetails}</p>
                    <div className="flex flex-col gap-5 mt-5">
                    <GroupVariants items={availableSizes} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)} />
                    <GroupVariants items={pizzaTypes} value={String(type)} onClick={value => setType(Number(value) as PizzaType)} />
                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map((ingredient) => (
                            <IngredientItem 
                            key={ingredient.id}
                            imageUrl={ingredient.imageUrl} 
                            name={ingredient.name} 
                            price={ingredient.price}
                            onClick={() => addIngredient(ingredient.id)}
                            active={selectedIngredients.has(ingredient.id)}
                            />
                        ))}
                    </div>
                    </div>
                </div>
            <Button loading={loading} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10" onClick={hundleClick}>
                Add to basket for {totalPrice} $
            </Button>
        </div>
    </div>
  )
}