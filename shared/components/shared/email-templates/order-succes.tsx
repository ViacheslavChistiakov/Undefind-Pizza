import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import * as React from 'react';

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccesTemplate : React.FC<Props> = ({
  orderId,
  items,
}) => (
  <div>
    <h1>#{orderId} Has been payed</h1>
    <p>
        You payed for everything bitch, now can sleep quiet 
    </p>
    <ul>
        {items.map((item) => (
            <li key={item.id}>
                <img className='w-100 h-100' src={item.productItem.product.imageUrl} alt="view" />
                {item.productItem.product.name} - {item.productItem.price}
            </li>
        ))}
    </ul>
  </div>
);