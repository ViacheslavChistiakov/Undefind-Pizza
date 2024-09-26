'use client';

import {  Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import React from 'react'
import { useRouter } from 'next/navigation';
import {  ChooseProductForm } from '../choose-product-form';
import { ProductWithRelation } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';

type Props = {
  product: ProductWithRelation;
  className?: string;
}

export const ChooseProductModals: React.FC<Props> = ({ className, product }) => {

  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType)


  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
        <DialogContent  className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
          {
            isPizzaForm ? (
              <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingridients}  items={[]}/>
            ) : (
            <ChooseProductForm imageUrl={product.imageUrl} name={product.name}  items={[]}  />
            )
          }
            
        </DialogContent>
    </Dialog>
  )
}