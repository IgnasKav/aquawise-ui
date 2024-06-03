import { cn } from '@/lib/utils';
import { TablePagination } from './table-pagination';
import { EntityTableColProps, EntityTableRow } from './table-row/table-row';

export type EntityTableProps = {
    className?: string;
    headerData: EntityTableColProps[];
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
    headerData,
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
                    'flex flex-col overflow-hidden border rounded-md',
                    className,
                )}
            >
                <EntityTableRow
                    className="text-muted-foreground font-medium bg-primary-foreground"
                    cols={headerData}
                />
                <div className="overflow-y-auto divide-y">{children}</div>
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
