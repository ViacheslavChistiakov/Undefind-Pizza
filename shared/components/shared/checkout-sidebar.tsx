import React from 'react'
import { WhiteBlock } from './white-block';
import { Button, Skeleton } from '../ui';
import { CheckoutItemsDetails } from './checkout-item-details';
import { ArrowRight, HandCoins, Package, Truck } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Props {
    totalAmount: number,
    loading?: boolean,
    subbmitting?: boolean,
    className?: string
}

const TAX = 10;
const DELIVERY_PRICE = 5;

export const CheckoutSidebar: React.FC<Props> = ({ className, loading, totalAmount }) => {
      const varPrice = (totalAmount * TAX) / 100;
      const totalPrice = totalAmount + DELIVERY_PRICE + varPrice;
  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
    <div className="flex flex-col gap-1">
      <span className="text-xl">Total:</span>
      {loading ? <Skeleton className="w-24 h-11" /> : <span className="h-11 text-[34px] font-extrabold">{totalPrice} $</span>}
    </div>
    <CheckoutItemsDetails icone={<Package />} title="Coast of product" value={loading ? <Skeleton className="w-12 h-21" /> : `${totalAmount} $`} />
    <CheckoutItemsDetails icone={<HandCoins />} title="Taxes" value={loading ? <Skeleton className="w-12 h-21" /> : `${varPrice} $`} />
    <CheckoutItemsDetails icone={<Truck />} title="Delivery" value={loading ? <Skeleton className="w-12 h-21" /> : `${DELIVERY_PRICE} $`} />
    <Button loading={loading} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
      Pay now
      <ArrowRight className="w-5 ml-2" />
    </Button>
  </WhiteBlock>
  )
}

