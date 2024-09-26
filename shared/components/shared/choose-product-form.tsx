import { cn } from '@/shared/lib/utils';
import React from 'react'
import { Title } from './title';
import { Button } from '../ui';

type Props = {
    imageUrl: string;
    name: string;
    items?:  any[];
    className?: string,
}

export const ChooseProductForm: React.FC<Props> = ({ 
    name,
    items,
    imageUrl,
    className,
 }) => {
    const textDetails = "30 sm traditional dough";
    const totalPrice = 100

  return (
    <div className={cn(className, 'flex flex-1')}>
    <div className="flex items-center justify-center flex-1 relative w-full"> 
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
    </div> 
        <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} className="font-extrabold mb-1" />
                <p className="text-gray-400">{textDetails}</p>
            <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                Add to basket for {totalPrice} $
            </Button>
        </div>
    </div>
  )
}