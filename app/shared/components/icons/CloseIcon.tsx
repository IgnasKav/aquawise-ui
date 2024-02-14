import { XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type CloseButtonProps = {
    color: 'red' | 'green';
    className?: string;
    onClick?: () => void;
};

export default function CloseButton({
    className,
    color,
    onClick,
}: CloseButtonProps) {
    return (
        <div
            onClick={onClick}
            className={cn(className, 'h-[24px] w-[24px] cursor-pointer')}
        >
            <div className="absolute left-[2px] top-[2px] rounded-full h-[20px] w-[20px] bg-background"></div>
            <XCircle
                className={cn(
                    'absolute',
                    {
                        'stroke-red-600 hover:stroke-red-700': color === 'red',
                    },
                    {
                        'stroke-green-600 hover:stroke-green-700':
                            color === 'green',
                    },
                )}
                size={24}
                strokeWidth={2}
            />
        </div>
    );
}
