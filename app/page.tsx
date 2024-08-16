import { Container, Filters, ProductCard, ProductListGroup, Title, TopBar } from "@/components/shared";






export default function Home() {
  return <>
      <Container className="mt-10">
          <Title text="All Pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
          <div className="flex gap-[80px]">
              {/* {Filtr} */}
              <div className="w-[250px]">
                    <Filters />
              </div>
              {/* {ListOfProducts} */}
              <div className="flex-1">
                  <div className="flex flex-col gap-16">
                    <ProductListGroup title="Pizzas" items={[
                        {
                        id: 1,
                        name: "Cheese Pizza",
                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                        price: 10,
                        items: [{price: 10}]
                        },
                        {
                            id: 2,
                            name: "Cheese Pizza",
                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                            price: 10,
                            items: [{price: 10}]
                            },
                            {
                                id: 3,
                                name: "Cheese Pizza",
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                                price: 10,
                                items: [{price: 10}]
                                },
                                {
                                    id: 4,
                                    name: "Cheese Pizza",
                                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                                    price: 10,
                                    items: [{price: 10}]
                                    },
                                    {
                                        id: 5,
                                        name: "Cheese Pizza",
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                                        price: 10,
                                        items: [{price: 10}]
                                        },
                                        {
                                            id: 6,
                                            name: "Cheese Pizza",
                                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                                            price: 10,
                                            items: [{price: 10}]
                                            },
                ]} categoryId={1} />
                <ProductListGroup title="Combo" items={[
                        {
                        id: 1,
                        name: "Cheese Pizza",
                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                        price: 10,
                        items: [{price: 10}]
                        },
                        {
                            id: 2,
                            name: "Cheese Pizza",
                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                            price: 10,
                            items: [{price: 10}]
                            },
                            {
                                id: 3,
                                name: "Cheese Pizza",
                                imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                                price: 10,
                                items: [{price: 10}]
                                },
                                {
                                    id: 4,
                                    name: "Cheese Pizza",
                                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                                    price: 10,
                                    items: [{price: 10}]
                                    },
                                    {
                                        id: 5,
                                        name: "Cheese Pizza",
                                        imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                                        price: 10,
                                        items: [{price: 10}]
                                        },
                                        {
                                            id: 6,
                                            name: "Cheese Pizza",
                                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                                            price: 10,
                                            items: [{price: 10}]
                                            },
                ]} categoryId={2} />
                  </div>
              </div>
          </div>
      </Container>
  </>
}
