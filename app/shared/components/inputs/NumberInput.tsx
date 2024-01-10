import { Input, InputProps } from '@/components/ui/input';
import { ChangeEvent } from 'react';
import { Control, useController } from 'react-hook-form';

type NumberInputProps = InputProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const { field } = useController({
        name,
        control,
    });

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const formatted = formatNumber(rawValue);
        field.onChange(formatted);
    };

    return (
        <Input
            label={label}
            onChange={handleOnChange}
            value={field.value}
            ref={field.ref}
            {...props}
        />
    );
};

export { NumberInput };
