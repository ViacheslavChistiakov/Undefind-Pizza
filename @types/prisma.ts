import { Ingridient, Product, ProductItem } from "@prisma/client";


export type ProductWithRelation = Product & { items: ProductItem[]; ingridients: Ingridient[] }; 