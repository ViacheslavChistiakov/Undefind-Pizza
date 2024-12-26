import { prisma } from '@/prisma/prisma-client';
import { updateCartTotalAmount } from '@/shared/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quanity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 });
    }

    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id,
        } 
    })

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }

    await prisma.cartItem.update({
        where: {
            id,
        },
        data: {
            quanity: data.quanity,
        },
    });

    const updatedUserCart = await updateCartTotalAmount(token)

    return NextResponse.json(updatedUserCart);

  } catch (err) {
    console.log('An error occurred', err);
    return NextResponse.json({ error: 'Could not updated cart' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 });
    }

    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id,
        } 
    })

    if(!cartItem) {
        return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    await prisma.cartItem.delete({
        where: {
            id,
        }
    })

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);

  } catch (err) {
    console.log('An error occurred', err);
    return NextResponse.json({ error: 'Could not delete item' }, { status: 500 });
  }
}
