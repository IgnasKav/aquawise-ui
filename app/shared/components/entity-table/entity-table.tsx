import { cn } from '@/lib/utils';
import { TablePagination } from './table-pagination';

export type EntityTableProps = {
    className?: string;
    entityName: string;
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
    children,
    page,
    pageSize,
    total,
}: EntityTableProps & Props) => {
    return (
        <div className="grow flex flex-col overflow-hidden gap-2">
            <div
                className={cn(
                    'overflow-y-scroll border rounded-md divide-y',
                    className,
                )}
            >
                {children}
            </div>
            <div className="grow"></div>
            <TablePagination
                className="flex-none pb-4"
                entityName={entityName}
                page={page}
                pageSize={pageSize}
                total={total}
            />
        </div>
    );
};

export { EntityTable };
