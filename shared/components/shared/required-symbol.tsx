import React from 'react';

export const RequiredSymbol: React.FC = () => {
    return (
        <span className="text-red-500 text-sm ml-1" title="Required field">
        *
        </span>
    );
}