import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { TableItem, TableItemProps } from './EntityTableItem';

type EntityTable = {
    type: 'clients' | 'products' | 'orders';
};

const tableItems: TableItemProps[] = [
    {
        name: 'Laser Lemonade Machine',
        status: 'Draft',
        price: 499.99,
        totalSales: 25,
        createdAt: new Date('2023-07-12T10:42:00'),
    },
    {
        name: 'Hypernova Headphones',
        status: 'Active',
        price: 129.99,
        totalSales: 100,
        createdAt: new Date('2023-10-18T15:21:00'),
    },
    {
        name: 'AeroGlow Desk Lamp',
        status: 'Active',
        price: 39.99,
        totalSales: 50,
        createdAt: new Date('2023-11-29T08:15:00'),
    },
    {
        name: 'TechTonic Energy Drink',
        status: 'Draft',
        price: 2.99,
        totalSales: 0,
        createdAt: new Date('2023-12-25T23:59:00'),
    },
    {
        name: 'Gamer Gear Pro Controller',
        status: 'Active',
        price: 59.99,
        totalSales: 75,
        createdAt: new Date('2024-01-01T00:00:00'),
    },
];

const EntityTable = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                    Manage your products and view their sales performance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Price
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Total Sales
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Created at
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableItems.map((item) => (
                            <TableItem
                                key={item.createdAt.toString()}
                                {...item}
                            />
                        ))}
                    </TableBody>
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
