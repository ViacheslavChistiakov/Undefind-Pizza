'use client'

import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterIngredients } from '@/app/hooks/useFilterIngredients';


interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({className}) => {
 
  const { ingredients, loading } = useFilterIngredients();

  const items = ingredients.map((item) => ({value: String(item.id), text: item.name}))


  return (
    <div className={className}> 
        <Title text="Filter" size="sm" className="mb-5 font-bold" />
           {/* {Top checkbox} */}
        <div className="flex flex-col gap-4">
              <FilterCheckbox text="Might getting" value="1"/>
              <FilterCheckbox text="New" value="2"/>
        </div>
          {/* {Filter of price} */}
        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
              <p className="font-bold mb-3">Price til until:</p>
              <div className="flex gap-3 mb-5">
                  <Input type="number" placeholder="0" min={0} max={80} defaultValue={0} />
                  <Input type="number" min={8} max={80} placeholder="100" />
              </div>
              <RangeSlider min={0} max={100} step={5} value={[0, 100]} />
        </div>

        <CheckboxFiltersGroup
          title="Ingridients"
          className="mt-5"
          limit={6}
          defaultItems={items.slice(0, 6)}
          items={items}
          loading={loading}
        />
    </div>
  )
}