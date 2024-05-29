import { cn } from '@/lib/utils';
import { TablePagination } from './table-pagination';

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
            <div className={cn('border rounded-md divide-y', className)}>
                <div>{header}</div>
                <div className="divide-y">{children}</div>
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
