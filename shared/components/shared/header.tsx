import { cn } from '@/shared/lib/utils';
import React from 'react'
import { Container } from './container';
import Image from 'next/image'
import { Button } from '../ui';
import { ArrowRight,  Car,  ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';



interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({className}) => {
    return (
        <header className={cn("border border-b", className)}>
            <Container className="flex items-center justify-between py-8">
                {/*  Left side  */}
                <Link href='/'>
                <div className="flex items-center gap-4">
                        <Image src="/logo.png" alt='Logo' width={35} height={35} />
                    <div>
                        <h1 className="text-2xl uppercase font-black">Undefind</h1>
                        <p className="text-sm text-grey-400 leading-3">Most delishes</p>
                    </div>
                </div>
                </Link>
                <div className='mx-10 flex-1'>
                    <SearchInput />
                </div>
                {/*  Right side  */}
                <div className="flex items-center gap-3">
                    <Button variant='outline' className='flex items-center gap-1'>
                        <User size={16} />
                        Sign
                    </Button>
                <div>
                    <CartButton />
                </div>
                </div>
            </Container>
        </header>
    )
}