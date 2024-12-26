import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { findOrCreateCart, updateCartTotalAmount } from "@/shared/lib";
import { CreateCartItemsValues } from "@/shared/services/dto/cart.dto";

export async function GET(req: NextRequest) {
    try {
        const userId = 1;
        const token = req.cookies.get('cartToken')?.value;
        
        if (!token) {
            return NextResponse.json({ totalAmount: 0, cartItems: [] });
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token,
                    }
                ]
            },
            include: {
             cartItems: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    productItem: {
                        include: {
                            product: true,
                        },
                    },
                    ingredients: true,
                }

             }
            },
        })

        return NextResponse.json(userCart);
    }
    catch (error) {
        console.log('CART GET ERROR', error);
        return NextResponse.json({ error: 'Something went wrong' }, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get('cartToken')?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemsValues

        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productItemId: data.productCartItemId,
                ingredients: { every: { id: { in: data.ingredients } } },
            }
        })

        // if item been found increase +1 to quanity
        if (findCartItem) {
            await prisma.cartItem.update({
                where: {
                    id: findCartItem.id,
                },
                data: {
                    quanity: findCartItem.quanity + 1,
                },
            })
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productCartItemId,
                    quanity: 1,
                    ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
                },
            });
        }

      

        const updatedUserCart = await updateCartTotalAmount(token);

        const resp =  NextResponse.json(updatedUserCart);
        resp.cookies.set('cartToken', token);
        return resp;

    } catch(error) {
        console.log('CART POST ERROR', error);
        return NextResponse.json({ error: 'Something went wrong' }, {status: 500});
    }
}