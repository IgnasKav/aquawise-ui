import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const SkeletonTableHeader = () => {
    return (
        <TableRow>
            <TableHead className="flex items-center">
                <div className="flex-1">
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex-1">
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex-1">
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex-1">
                    <Skeleton className="h-4 w-24" />
                </div>
            </TableHead>
        </TableRow>
    );
};

const SkeletomTableRow = () => (
    <TableRow>
        <TableCell>
            <Skeleton className="h-8 w-full" />
        </TableCell>
    </TableRow>
);

const TableLoader = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-4 w-24" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="mt-1 h-3 w-32" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <SkeletonTableHeader />
                    </TableHeader>
                    <TableBody>
                        <SkeletomTableRow />
                        <SkeletomTableRow />
                        <SkeletomTableRow />
                        <SkeletomTableRow />
                        <SkeletomTableRow />
                        <SkeletomTableRow />
                        <SkeletomTableRow />
                        <SkeletomTableRow />
                        <SkeletomTableRow />
                        <SkeletomTableRow />
                        <SkeletomTableRow />
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default TableLoader;
