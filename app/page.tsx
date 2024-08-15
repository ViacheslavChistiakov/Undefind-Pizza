import { Container, Filters, ProductCard, Title, TopBar } from "@/components/shared";






export default function Home() {
  return <>
      <Container className="mt-10">
          <Title text="All Pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
          <div className="flex gap-[60px]">
              {/* {Filtr} */}
              <div className="w-[250px]">
                    <Filters />
              </div>
              {/* {ListOfProducts} */}
              <div className="flex-1">
                  <div className="flex flex-col gap-16">
                    <ProductCard id={1} name={"Cheese Chicken"} price={10} imageUrl={"https://media.dodostatic.net/image/r:292x292/11EE7D614CBE0530B7234B6D7A6E5F8E.avif"} />
                  </div>
              </div>
          </div>
      </Container>
  </>
}
