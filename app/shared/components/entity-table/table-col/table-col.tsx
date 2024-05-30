import { Badge } from '@/components/ui/badge';
import { TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export type StringColProps = {
    value: string | number;
    className?: string;
};

export type StatusColProps = StringColProps;

type ImageColProps = {
    src: string;
    name: string;
    className?: string;
};

const StringCol = ({ value, className }: StringColProps) => {
    return (
        <div
            className={cn(
                'text-ellipsis overflow-hidden whitespace-nowrap',
                className,
            )}
        >
            {value}
        </div>
    );
};

const StatusCol = ({ value, className }: StatusColProps) => {
    return (
        <div className={className}>
            <Badge variant="outline">{value}</Badge>
        </div>
    );
};

const ImageCol = ({ src, name, className }: ImageColProps) => {
    return (
        <TableCell className={className}>
            <Image
                alt={name}
                className="aspect-square rounded-md object-cover"
                height="64"
                src={src}
                width="64"
            />
        </TableCell>
    );
};

export { StringCol, StatusCol, ImageCol };
