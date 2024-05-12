import { TableRow } from '@/components/ui/table';
import { Client } from '../../models/Client';
import {
    StatusCol,
    StringCol,
} from 'app/shared/components/entity-table/table-col/table-col';
import { ClientsTableItemActions } from './clients-table-item-actions';

type ClientsTableItemProps = {
    client: Client;
    index: number;
};

const ClientsTableItem = ({ client, index }: ClientsTableItemProps) => {
    return (
        <TableRow>
            <StringCol value={index} />
            <StringCol value={client.email} />
            <StringCol value={client.name} />
            <StatusCol className="hidden md:table-cell" value={client.type} />
            <StringCol className="hidden md:table-cell" value={client.phone} />
            <StringCol
                className="hidden md:table-cell"
                value={client.address}
            />
            <ClientsTableItemActions client={client} />
        </TableRow>
    );
};

export default ClientsTableItem;
