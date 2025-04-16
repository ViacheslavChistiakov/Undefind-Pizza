'use client';

import { useCart } from '@/app/hooks';
import { CheckoutItem, CheckoutSidebar, Container, Title, WhiteBlock } from '@/shared/components/shared';
import { Input, Textarea } from '@/shared/components/ui';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { getCartItemDetails } from '@/shared/lib';




export default function CheckoutPage() {
  const { totalAmount, updateItemsQuantity, cartItems, removeCartItem } = useCart();

  return (
    <Container className="mt-10">
      <Title text="Checkout" className="font-extrabold mb-8 text-[36px]" />
      <div className="flex gap-10">
        {/* Left Side */}
        <div className="flex flex-col gap-10  flex-1 mb-20">
          <WhiteBlock title="1. Card">
            <div className="flex flex-col gap-5">
              {cartItems.map((item) => (
                <CheckoutItem
                  key={item.id}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize,
                  )}
                  {...item}
                  onClickCountButton={(type) => {
                    const newQuantity = type === 'plus' ? item.quantity + 1 : item.quantity - 1;
                    updateItemsQuantity(item.id, newQuantity);
                  }}
                  onClickRemove={() => removeCartItem(item.id)}
                />
              ))}
            </div>
          </WhiteBlock>
          <WhiteBlock title="2. Personal Data">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="Name" />
              <Input name="lastName" className="text-base" placeholder="Lastname" />
              <Input name="email" className="text-base" placeholder="E-mail" />
              <Input name="phone" className="text-base" placeholder="Phone" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Delivery Address">
            <div className="flex flex-col gap-5">
              <Input name="Address" className="text-base" placeholder="Type your address..." />
              <Textarea placeholder="Comment for order" className="text-base" rows={5} />
            </div>
          </WhiteBlock>
        </div>
        {/* Right Side */}
        <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount}  />
        </div>
      </div>
    </Container>
  );
}
