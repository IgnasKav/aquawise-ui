import {
    EntityTable,
    EntityTableProps,
} from 'app/shared/components/entity-table/entity-table';
import { OrdersTableItem } from './orders-table-item/orders-table-item';
import { OrdersTableItemProps } from '../models/OrdersTable';
import { OrdersTableHeader } from './orders-table-header';

const orders: OrdersTableItemProps[] = [
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

const OrdersTable = () => {
    const ordersTableData: EntityTableProps = {
        title: 'Orders',
        description: 'Manage your orders',
        header: <OrdersTableHeader />,
    };

    return (
        <EntityTable {...ordersTableData}>
            {orders.map((order) => (
                <OrdersTableItem key={order.createdAt.toString()} {...order} />
            ))}
        </EntityTable>
    );
};

export { OrdersTable };
