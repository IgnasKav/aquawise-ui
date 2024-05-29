import { cn } from '@/lib/utils';
import { TablePagination } from '../entity-table/table-pagination';

export type EntityGridProps = {
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

const EntityGrid = ({
    className,
    entityName,
    header,
    children,
    page,
    pageSize,
    total,
}: EntityGridProps & Props) => {
    return (
        <>
            <div className={cn(className)}>
                <div>{header}</div>
                <div>{children}</div>
                <TablePagination
                    className="absolute bottom-4 mb-4"
                    entityName={entityName}
                    page={page}
                    pageSize={pageSize}
                    total={total}
                />
            </div>
        </>
    );
};

export { EntityGrid };
