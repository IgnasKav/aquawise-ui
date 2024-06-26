'use client';

import { useCallback } from 'react';
import { PaginationComponent } from '../pagination/pagination';
import { cn } from '@/lib/utils';

type TablePaginationComponentProps = {
    className?: string;
    entityName: string;
    page: number;
    pageSize: number;
    total: number;
};

export function TablePagination({
    className,
    entityName,
    page,
    pageSize,
    total,
}: TablePaginationComponentProps) {
    const getPaginationInfo = useCallback(() => {
        const itemsFrom = page * pageSize - pageSize + 1;
        const itemsTo = page * pageSize < total ? page * pageSize : total;

        return {
            itemsFrom,
            itemsTo,
        };
    }, [page, pageSize, total]);

    const { itemsFrom, itemsTo } = getPaginationInfo();

    return (
        <div
            className={cn(
                className,
                'relative flex justify-items-center w-full',
            )}
        >
            <div className="absolute top-3 text-xs text-muted-foreground">
                Showing{' '}
                <strong>
                    {itemsFrom}-{itemsTo}
                </strong>{' '}
                of <strong>{total}</strong> {entityName.toLowerCase()}
            </div>
            <PaginationComponent
                page={page}
                pageSize={pageSize}
                total={total}
            />
        </div>
    );
}
