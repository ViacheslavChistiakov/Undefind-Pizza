'use client'

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
    onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
    return (
        <AddressSuggestions token="0d23141a5bac9043312be88e24b623f6ccf0e7ca"
          onChange={(data) => onChange?.(data?.value)}
         />
    )
}