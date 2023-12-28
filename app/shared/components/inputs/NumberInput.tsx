import { Input, InputProps } from '@/components/ui/input';
import { ChangeEvent } from 'react';
import { Control, Controller } from 'react-hook-form';

type NumberInputProps = InputProps & {
    control: Control<any>;
    name: string;
};

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

const NumberInput = ({ control, name, label, ...props }: NumberInputProps) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value, ref } }) => {
                const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
                    const rawValue = e.target.value;
                    const formatted = formatNumber(rawValue);
                    onChange(formatted);
                };

                return (
                    <Input
                        label={label}
                        {...props}
                        ref={ref}
                        onBlur={onBlur}
                        value={value ? formatNumber(value.toString()) : ''}
                        onChange={handleOnChange}
                    />
                );
            }}
        />
    );
};

NumberInput.displayName = 'NumberInput';

export { NumberInput };
