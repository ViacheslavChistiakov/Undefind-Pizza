'use client'

import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormTextarea } from '../form';
import { AddressInput } from '../address-input';
import { ErrorText } from '../error-text';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  className?: string;
}

export const CheckoutDelivery: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Delivery Address" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          name="address"
          control={control}
          defaultValue=""
          rules={{ required: 'This field is required' }}
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />
        <FormTextarea
          name="comment"
          placeholder="Comment for order"
          className="text-base"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
