import React from 'react'
import { WhiteBlock } from './white-block';
import { Button } from '../ui';
import { CheckoutItemsDetails } from './checkout-item-details';
import { ArrowRight, HandCoins, Package, Truck } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Props {
    totalAmount: number,
    className?: string
}

const TAX = 10;
const DELIVERY_PRICE = 5;

export const CheckoutSidebar: React.FC<Props> = ({ className, totalAmount }) => {
      const varPrice = (totalAmount * TAX) / 100;
      const totalPrice = totalAmount + DELIVERY_PRICE + varPrice;
  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
    <div className="flex flex-col gap-1">
      <span className="text-xl">Total:</span>
      <span className="text-[34px] font-extrabold">{totalPrice} $</span>
    </div>
    <CheckoutItemsDetails icone={<Package />} title="Coast of product" value={`${totalAmount} $`} />
    <CheckoutItemsDetails icone={<HandCoins />} title="Taxes" value={`${varPrice} $`} />
    <CheckoutItemsDetails icone={<Truck />} title="Delivery" value={`${DELIVERY_PRICE} $`} />
    <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
      Pay now
      <ArrowRight className="w-5 ml-2" />
    </Button>
  </WhiteBlock>
  )
}

