import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export type InputProps = {
    label: string;
    error?: string;
    required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ id, label, error, required, className, ...props }, ref) => {
        return (
            <div className="grid w-full items-center">
                <Label htmlFor={id} className="mb-2">
                    {label}
                    {required && <span className="text-red-500">&nbsp;*</span>}
                </Label>
                <input
                    className={cn(
                        'mb-[3px] flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
                <div className="h-2 text-xs text-red-500">{error}</div>
            </div>
        );
    },
);

Input.displayName = 'Input';

export { Input };
