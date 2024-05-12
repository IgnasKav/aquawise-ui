import { PaginationComponent } from 'app/shared/components/pagination/pagination';

type ClientTableFooterProps = {
    page: number;
    pageSize: number;
    total: number;
};

const ClientTableFooter = ({
    page,
    pageSize,
    total,
}: ClientTableFooterProps) => {
    const itemsFrom = page * pageSize - pageSize + 1;
    const itemsTo = page * pageSize < total ? page * pageSize : total;

    return (
        <div className="relative flex justify-items-center w-full">
            <div className="absolute top-3 text-xs text-muted-foreground">
                Showing{' '}
                <strong>
                    {itemsFrom}-{itemsTo}
                </strong>{' '}
                of <strong>{total}</strong> products
            </div>
            <PaginationComponent
                page={page}
                pageSize={pageSize}
                total={total}
            />
        </div>
    );
};

export { ClientTableFooter };
