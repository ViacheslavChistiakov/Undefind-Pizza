'use client'

import { Title } from './title';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilters, useIngredients, useQueryFilters } from '@/app/hooks';






interface Props {
    className?: string
}




export const Filters: React.FC<Props> = ({className}) => {

  const {ingredients, loading} = useIngredients();
  const filters = useFilters();
  
  useQueryFilters(filters);




  
 
  const items = ingredients.map((item) => ({value: String(item.id), text: item.name}));


  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  }
  



  

  


  return (
    <div className={className}> 
        <Title text="Filter" size="sm" className="mb-5 font-bold" />
           {/* {Top checkbox} */}
    <CheckboxFiltersGroup
        title="Type of dough"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckBox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: 'Slim', value: '1' },
          { text: 'Traditional', value: '2' },
        ]} defaultItems={[]}      />

  <CheckboxFiltersGroup
        title="Sizes"
        name="sizes"
        className="mb-5"
        onClickCheckBox={filters.setSizes}
        selected={filters.sizes}
        items={[
          { text: '20 sm', value: '20' },
          { text: '30 sm', value: '30' },
          { text: '40 sm', value: '40' },
        ]} defaultItems={[]}      />
          {/* {Filter of price} */}
        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
              <p className="font-bold mb-3">Price til until:</p>
              <div className="flex gap-3 mb-5">
                  <Input type="number"
                   placeholder="0" min={0}
                    max={80} 
                    value={String(filters.prices.priceFrom)}
                    onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
                     />
                  <Input type="number"
                   min={8} max={80} 
                   placeholder="100" 
                   value={String(filters.prices.priceTo)}
                   onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
                   />
              </div>
              <RangeSlider min={0} max={100} step={5} value={[
                filters.prices.priceFrom || 0,
                filters.prices.priceTo || 100
              ]}
              onValueChange={updatePrices}
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
          onClickCheckBox={filters.setSelectedIngredients}
          selected={filters.selectedIngredients}
        />
    </div>
  )
}