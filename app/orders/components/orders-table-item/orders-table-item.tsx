import { TableRow } from '@/components/ui/table';
import {
    ImageCol,
    StringCol,
    StatusCol,
} from 'app/shared/components/entity-table/table-col/table-col';
import { OrdersTableItemProps } from '../../models/OrdersTable';
import { OrdersTableItemsActions } from './orders-table-item-actions';

const OrdersTableItem = (props: OrdersTableItemProps) => {
    const { name, status, price, totalSales, createdAt } = props;

    return (
        <TableRow>
            <ImageCol
                className="hidden sm:table-cell"
                src="/placeholder.svg"
                name="Product image"
            />
            <StringCol className="font-medium" value={name} />
            <StatusCol value={status} />
            <StringCol className="hidden md:table-cell" value={`$${price}`} />
            <StringCol
                className="hidden md:table-cell"
                value={totalSales}
            ></StringCol>
            <StringCol
                className="hidden md:table-cell"
                value={createdAt.toDateString()}
            ></StringCol>
            <OrdersTableItemsActions />
        </TableRow>
    );
};

export { OrdersTableItem };
