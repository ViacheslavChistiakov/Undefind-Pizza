import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form/form-input';
import { Input } from '../../ui/input';

interface Props {
  className?: string;
}

export const CheckoutData: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Personal Data" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="Name" />
        <FormInput name="lastName" className="text-base" placeholder="Lastname" />
        <FormInput name="email" className="text-base" placeholder="E-mail" />
        <FormInput name="phone" className="text-base" placeholder="Phone" />
      </div>
    </WhiteBlock>
  );
};
