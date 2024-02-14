import { XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type CloseButtonProps = {
    color?: 'red' | 'green' | 'default';
    className?: string;
    onClick?: () => void;
};

export default function CloseButton({
    className,
    color,
    onClick,
}: CloseButtonProps) {
    color ??= 'default';

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
                        'stroke-red-600 hover:stroke-red-600/80':
                            color === 'red',
                    },
                    {
                        'stroke-green-600 hover:stroke-green-600/80':
                            color === 'green',
                    },
                    {
                        'stroke-primary hover:stroke-primary/80':
                            color === 'default',
                    },
                )}
                size={24}
                strokeWidth={2}
            />
        </div>
    );
}
