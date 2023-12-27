import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletomTableRow = () => (
    <div className="h-10 p-2 border-b last:border-b-0">
        <Skeleton className="h-full w-full" />
    </div>
);

const TableLoader = () => {
    return (
        <Card>
            <SkeletomTableRow />
            <SkeletomTableRow />
            <SkeletomTableRow />
            <SkeletomTableRow />
            <SkeletomTableRow />
            <SkeletomTableRow />
        </Card>
    );
};

export default TableLoader;
