import { Badge } from '@/components/ui/badge';
import { TableCell } from '@/components/ui/table';
import Image from 'next/image';

// type TableColProps = {
//     type: 'string' | 'number' | 'status' | 'date' | 'image';
// };

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

const StatusCol = ({ value, className }: StatusColProps) => {
    return (
        <TableCell className={className}>
            <Badge variant="outline">{value}</Badge>
        </TableCell>
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
