'use client';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type PaginationComponentProps = {
    entityName: string;
    page: number;
    pageSize: number;
    total: number;
};

export function TablePagination({
    entityName,
    page,
    pageSize,
    total,
}: PaginationComponentProps) {
    const searchParams = useSearchParams();
    const path = usePathname();
    const router = useRouter();

    const navigate = useCallback(
        (page: number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('p', page.toString());

            const queryString = params.toString();
            const res = `${path}?${queryString}`;

            router.push(res);
        },
        [searchParams, path, router],
    );

    const getPaginationInfo = useCallback(() => {
        const nOfPages = Math.ceil(total / pageSize);
        const displayPrevEllipsis = nOfPages > 2 && page > 2;
        const displayNextEllipsis = nOfPages > 2 && nOfPages - page > 1;
        const hasPrev = page - 1 > 0;
        const hasNext = page + 1 <= nOfPages;
        const itemsFrom = page * pageSize - pageSize + 1;
        const itemsTo = page * pageSize < total ? page * pageSize : total;
        let pageRange: number[] = [];

        if (hasPrev && hasNext) {
            pageRange = [page - 1, page, page + 1];
        } else if (hasNext && !hasPrev) {
            pageRange = [page, page + 1];

            if (page + 2 < nOfPages) {
                pageRange.push(page + 2);
            }
        } else if (hasPrev && !hasNext) {
            if (page - 2 > 0) {
                pageRange = [page - 2, page - 1, page];
            } else {
                pageRange = [page - 1, page];
            }
        } else {
            pageRange = [page];
        }

        return {
            displayPrevEllipsis,
            displayNextEllipsis,
            hasPrev,
            hasNext,
            itemsFrom,
            itemsTo,
            pageRange,
        };
    }, [page, pageSize, total]);

    const {
        itemsFrom,
        itemsTo,
        hasPrev,
        hasNext,
        displayPrevEllipsis,
        displayNextEllipsis,
        pageRange,
    } = getPaginationInfo();

    return (
        <div className="relative flex justify-items-center w-full">
            <div className="absolute top-3 text-xs text-muted-foreground">
                Showing{' '}
                <strong>
                    {itemsFrom}-{itemsTo}
                </strong>{' '}
                of <strong>{total}</strong> {entityName.toLowerCase()}
            </div>
            <Pagination>
                <PaginationContent>
                    {hasPrev && (
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => navigate(page - 1)}
                            />
                        </PaginationItem>
                    )}
                    {displayPrevEllipsis && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}
                    {pageRange.map((p) => (
                        <PaginationItem key={p}>
                            <PaginationLink
                                onClick={() => navigate(p)}
                                isActive={p === page}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    {displayNextEllipsis && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}
                    {hasNext && (
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => navigate(page + 1)}
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
}
