import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationComponentProps = {
    page: number;
    pageSize: number;
    total: number;
};

export function PaginationComponent({
    page,
    pageSize,
    total,
}: PaginationComponentProps) {
    const nOfPages = total / pageSize;
    const displayPrevEllipsis = nOfPages > 2 && page > 2;
    const displayNextEllipsis = nOfPages > 2 && nOfPages - page > 2;
    const hasPrev = page - 1 > 0;
    const hasNext = page + 1 <= nOfPages;

    const getPageRange = () => {
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

        return pageRange;
    };

    const pageRange = getPageRange();

    return (
        <Pagination>
            <PaginationContent>
                {hasPrev && (
                    <PaginationItem>
                        <PaginationPrevious href={`/clients?p=${page - 1}`} />
                    </PaginationItem>
                )}
                {displayPrevEllipsis && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {pageRange.map((p, index) => (
                    <PaginationItem key={p}>
                        <PaginationLink
                            href={`/clients?p=${page}`}
                            isActive={index + 1 === page}
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
                        <PaginationNext href={`/clients?p=${page + 1}`} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}
