import { TableCell, TableRow } from '@/components/ui/table';
import { Client } from '../models/Client';

type ClientsTableItemProps = {
    client: Client;
};

const ClientsTableItem = ({ client }: ClientsTableItemProps) => {
    return (
        <TableRow>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.phone}</TableCell>
            <TableCell>{client.address}</TableCell>
            <TableCell>{client.type}</TableCell>
        </TableRow>
    );
};

export default ClientsTableItem;
