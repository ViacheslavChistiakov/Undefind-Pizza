import * as React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string
}

export const PayOrderTemplate: React.FC<Props> = ({
  orderId,
  totalAmount,
  paymentUrl
}) => (
  <div>
    <h1>Order with #{orderId}!</h1>
    <p>You have to pay money, mooran! {totalAmount}$ for all
      Follow by <a href={paymentUrl}>this link</a> for payment stupid asshole
    </p>
  </div>
);