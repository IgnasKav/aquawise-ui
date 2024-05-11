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
    footer: React.ReactNode;
};

type Props = {
    children: React.ReactNode;
};

const EntityTable = ({
    title,
    description,
    header,
    footer,
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
            <CardFooter>{footer}</CardFooter>
        </Card>
    );
};

export { EntityTable };
