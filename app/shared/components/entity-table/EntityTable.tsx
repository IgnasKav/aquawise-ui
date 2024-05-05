import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Table, TableBody, TableHeader } from '@/components/ui/table';

export type EntityTableProps = {
    title: string;
    description: string;
    header: React.ReactNode;
};

type Props = {
    children: React.ReactNode;
};

const EntityTable = ({
    title,
    description,
    header,
    children,
}: EntityTableProps & Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>{header}</TableHeader>
                    <TableBody>{children}</TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{' '}
                    products
                </div>
            </CardFooter>
        </Card>
    );
};

export { EntityTable };
