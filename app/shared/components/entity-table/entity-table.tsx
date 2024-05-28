import { Table, TableBody, TableHeader } from '@/components/ui/table';
import { TablePagination } from './table-pagination';
import { cn } from '@/lib/utils';

export type EntityTableProps = {
    className?: string;
    entityName: string;
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
    header,
    children,
    page,
    pageSize,
    total,
}: EntityTableProps & Props) => {
    return (
        <>
            <div
                className={cn(className, 'flex flex-col grow overflow-hidden')}
            >
                <div className="border rounded-md  flex overflow-hidden">
                    <Table className="overflow-hidden overflow-y-auto">
                        <TableHeader className="rounded">{header}</TableHeader>
                        <TableBody>{children}</TableBody>
                    </Table>
                </div>
            </div>
            <TablePagination
                className="absolute bottom-4 mb-4"
                entityName={entityName}
                page={page}
                pageSize={pageSize}
                total={total}
            />
        </>
    );
};

export { EntityTable };
