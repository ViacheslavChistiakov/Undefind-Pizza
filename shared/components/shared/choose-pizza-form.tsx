import { cn } from '@/shared/lib/utils';
import { Ingridient, ProductItem } from '@prisma/client';
import React from 'react'
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variant';
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { IngredientItem } from './ingredient-item';
import { useSet } from 'react-use';

type Props = {
    imageUrl: string;
    name: string;
    ingredients: Ingridient[];
    items:  any[];
    className?: string,
}

export const ChoosePizzaForm: React.FC<Props> = ({ 
    name,
    items,
    imageUrl,
    ingredients,
    className,
 }) => {
    const [size, setSize] = React.useState<PizzaSize>(20);
    const [type, setType] = React.useState<PizzaType>(1);

    const [selectedIngredients, { toggle: addIngredient } ] = useSet(new Set<Number>([]))


    const textDetails = "30 sm traditional dough";
    const totalPrice = 100

  return (
    <div className={cn(className, 'flex flex-1')}>

    <PizzaImage imageUrl={imageUrl} size={size} /> 



        <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} className="font-extrabold mb-1" />
                <p className="text-gray-400">{textDetails}</p>
                    <div className="flex flex-col gap-5 mt-5">
                    <GroupVariants items={pizzaSizes} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)} />
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
            <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                Add to basket for {totalPrice} $
            </Button>
        </div>
    </div>
  )
}