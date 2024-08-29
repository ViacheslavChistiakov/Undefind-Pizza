'use client'

import React, { useEffect } from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterIngredients } from '@/app/hooks/useFilterIngredients';
import { useSet } from 'react-use';
import qs from 'qs';
import { useRouter } from 'next/navigation';



interface Props {
    className?: string
}

interface PriceProps {
  priceFrom?: number,
  priceTo?: number
}

export const Filters: React.FC<Props> = ({className}) => {
  
  const router = useRouter();

  const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients();
  const [prices, setPrice] = React.useState<PriceProps>({});
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<String>([]));
  const [pizzaTypes, { toggle: togglePizaaTypes }] = useSet(new Set<String>([]));
  const items = ingredients.map((item) => ({value: String(item.id), text: item.name}))

  const updatetPrice = (name: keyof PriceProps, value: number ) => {
    setPrice({
      ...prices,
      [name]: value
    })
  }


  
  React.useEffect(() => {
    const filters = {
      ...prices,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients)
    };
    const query = qs.stringify(filters, {
      arrayFormat: 'comma',
    });
      // console.log(qs.stringify(filters, {
      //   arrayFormat: 'comma',
      // }));
    router.push(`?${query}`)
  }, [prices, pizzaTypes, sizes, selectedIngredients, router])


  return (
    <div className={className}> 
        <Title text="Filter" size="sm" className="mb-5 font-bold" />
           {/* {Top checkbox} */}
    <CheckboxFiltersGroup
        title="Type of dough"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckBox={togglePizaaTypes}
        selected={pizzaTypes}
        items={[
          { text: 'Slim', value: '1' },
          { text: 'Traditional', value: '2' },
        ]}
      />

  <CheckboxFiltersGroup
        title="Sizes"
        name="sizes"
        className="mb-5"
        onClickCheckBox={toggleSizes}
        selected={sizes}
        items={[
          { text: '20 sm', value: '20' },
          { text: '30 sm', value: '30' },
          { text: '40 sm', value: '40' },
        ]}
      />
          {/* {Filter of price} */}
        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
              <p className="font-bold mb-3">Price til until:</p>
              <div className="flex gap-3 mb-5">
                  <Input type="number"
                   placeholder="0" min={0}
                    max={80} 
                    value={String(prices.priceFrom)}
                    onChange={(e) => updatetPrice('priceFrom', Number(e.target.value))}
                     />
                  <Input type="number"
                   min={8} max={80} 
                   placeholder="100" 
                   value={String(prices.priceTo)}
                   onChange={(e) => updatetPrice('priceTo', Number(e.target.value))}
                   />
              </div>
              <RangeSlider min={0} max={100} step={5} value={[
                prices.priceFrom || 0,
                prices.priceTo || 100
              ]}
              onValueChange={([priceFrom, priceTo]) => setPrice({priceFrom, priceTo})}
               />
        </div>

        <CheckboxFiltersGroup
          title="Ingridients"
          name='Ingredients'
          className="mt-5"
          limit={6}
          defaultItems={items.slice(0, 6)}
          items={items}
          loading={loading}
          onClickCheckBox={onAddId}
          selected={selectedIngredients}
        />
    </div>
  )
}