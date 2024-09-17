import { Container, Filters, ProductCard, ProductListGroup, Title, TopBar } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { Key } from "lucide-react";






export default async function Home() {

    const categories = await prisma.category.findMany({
      include: {
        products: {
            include: {
                ingridients: true,
                items: true,
            }
        }
      }
    });

    console.log(categories);

  return <>
      <Container className="mt-10">
          <Title text="All Pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar  categories={categories.filter((category) => category.products.length > 0)}/>
      <Container className="mt-10 pb-14">
          <div className="flex gap-[80px]">
              {/* {Filtr} */}
              <div className="w-[250px]">
                    <Filters />
              </div>
              {/* {ListOfProducts} */}
              <div className="flex-1">
                  <div className="flex flex-col gap-16">
                        {
                            categories.map((category) => (
                                category.products.length > 0 && (
                                    <ProductListGroup
                                        key={category.id}
                                        title={category.name}
                                        categoryId={category.id}
                                        items={category.products}
                                    />
                                )
                            ))
                        }  
                  </div>
              </div>
          </div>
      </Container>
  </>
}
