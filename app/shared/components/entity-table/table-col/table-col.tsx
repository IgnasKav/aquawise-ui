import { Badge } from '@/components/ui/badge';
import { TableCell, TableHead } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type StringColProps = {
    value: string | number;
    className?: string;
};

type StatusColProps = StringColProps;

type ImageColProps = {
    src: string;
    name: string;
    className?: string;
};

const StringCol = ({ value, className }: StringColProps) => {
    return <TableCell className={className}>{value}</TableCell>;
};

const StringCol2 = ({ value, className }: StringColProps) => {
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
        <TableCell className={className}>
            <Badge variant="outline">{value}</Badge>
        </TableCell>
    );
};

const StatusCol2 = ({ value, className }: StatusColProps) => {
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

const HeaderCol = ({
    value,
    className,
}: {
    value?: string;
    className?: string;
}) => {
    return (
        <TableHead
            className={cn(className, 'bg-primary-foreground sticky top-0')}
        >
            {value}
        </TableHead>
    );
};

export { StringCol, StringCol2, StatusCol, StatusCol2, ImageCol, HeaderCol };
