import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableRow, TableCell } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import { ImageCol, StatusCol, StringCol } from './table-col/TableCol';

export type TableItemProps = {
    name: string;
    status: string;
    price: number;
    totalSales: number;
    createdAt: Date;
};

const TableItem = (props: TableItemProps) => {
    const { name, status, price, totalSales, createdAt } = props;

    return (
        <TableRow>
            <ImageCol
                className="hidden sm:table-cell"
                src="/placeholder.svg"
                name="Product image"
            />
            <StringCol className="font-medium" value={name} />
            <StatusCol value={status} />
            <StringCol className="hidden md:table-cell" value={`$${price}`} />
            <StringCol
                className="hidden md:table-cell"
                value={totalSales}
            ></StringCol>
            <StringCol
                className="hidden md:table-cell"
                value={createdAt.toDateString()}
            ></StringCol>
            <TableCell>
                <TableItemActions />
            </TableCell>
        </TableRow>
    );
};

const TableItemActions = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { TableItem };
