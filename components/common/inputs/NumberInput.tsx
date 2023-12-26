import { Input, InputProps } from '@/components/ui/input';
import { forwardRef, useState } from 'react';

type NumberInputProps = InputProps;

const formatNumber = (value: string) => {
    const containsMoreThanOneDot = value.split('.').length - 1 > 1;

    if (containsMoreThanOneDot) {
        return value.slice(0, -1);
    }

    if (value.endsWith('.')) {
        return value;
    }

    const sanitizedValue = value.replaceAll(',', '');

    let number = parseFloat(sanitizedValue);
    const minNumber = -99999999999999;
    const maxNumber = 99999999999999;

    if (number < minNumber) number = minNumber;
    if (number > maxNumber) number = maxNumber;

    if (!number || isNaN(number)) return '';

    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2,
    }).format(number);
};

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    ({ value, onChange, ...props }, ref) => {
        const [formattedValue, setFormattedValue] = useState<string>(
            value ? formatNumber(value.toString()) : '',
        );

        const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawValue = e.target.value;
            const value = formatNumber(rawValue);
            setFormattedValue(value);

            if (onChange) {
                const test = value.replaceAll(',', '');

                console.log(test);

                onChange({
                    ...e,
                    target: { ...e.target, value: value.replaceAll(',', '') },
                });
            }
        };

        return (
            <Input
                ref={ref}
                onChange={handleOnChange}
                value={formattedValue}
                {...props}
            ></Input>
        );
    },
);

NumberInput.displayName = 'NumberInput';

export { NumberInput };
