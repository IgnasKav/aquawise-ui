import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Table, TableBody, TableHeader } from '@/components/ui/table';
import { TablePagination } from './table-pagination';

export type EntityTableProps = {
    className?: string;
    entityName: string;
    description: string;
    header: React.ReactNode;
    page: number;
    pageSize: number;
    total: number;
};

type Props = {
    children: React.ReactNode;
};

const EntityTable = ({
    className,
    entityName,
    description,
    header,
    children,
    page,
    pageSize,
    total,
}: EntityTableProps & Props) => {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{entityName}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>{header}</TableHeader>
                    <TableBody>{children}</TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <TablePagination
                    entityName={entityName}
                    page={page}
                    pageSize={pageSize}
                    total={total}
                />
            </CardFooter>
        </Card>
    );
};

export { EntityTable };
