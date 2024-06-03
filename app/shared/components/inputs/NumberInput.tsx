import { Input, InputProps } from '@/components/ui/input';
import { useState, useEffect, ChangeEvent } from 'react';
import { Control, useController } from 'react-hook-form';

type NumberInputProps = InputProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    type?: NumberInputTypes;
};

type NumberInputTypes = 'int' | 'float';

const formatNumberForDisplay = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2,
    }).format(value);
};

const sanitizeInt = (value: string): string => {
    value = value.replace(/[^\d,]/g, '');

    return value;
};

const sanitizeFloat = (value: string): string => {
    value = value.replace(/[^\d.,]/g, '');

    const numberOfDots = value.split('.').length - 1;

    if (numberOfDots > 1) {
        return value.slice(0, -1);
    }

    if (numberOfDots === 1) {
        const decimal = value.split('.')[1];

        if (decimal.length > 2) {
            return value.slice(0, -1);
        }
    }

    return value;
};

const sanitize = (value: string, type?: NumberInputTypes) => {
    switch (type) {
        case 'int':
            return sanitizeInt(value);
        default:
            return sanitizeFloat(value);
    }
};

const parseNumber = (value: string) => {
    value = value.replaceAll(',', '');

    return parseFloat(value) || 0;
};

const NumberInput = ({
    control,
    name,
    label,
    type,
    ...props
}: NumberInputProps) => {
    const { field } = useController({ name, control });
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        setDisplayValue(formatNumberForDisplay(field.value));
    }, [field.value]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const sanitizedValue = sanitize(rawValue, type);
        const numericValue = parseNumber(sanitizedValue);
        field.onChange(numericValue); // Update form state with numeric value
        setDisplayValue(sanitizedValue); // Update local state for display
    };

    return (
        <Input
            label={label}
            onChange={handleOnChange}
            value={displayValue}
            ref={field.ref}
            inputMode="decimal"
            {...props}
        />
    );
};

export { NumberInput };
