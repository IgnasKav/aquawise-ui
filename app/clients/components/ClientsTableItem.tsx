import { TableCell, TableRow } from '@/components/ui/table';
import { CompanyClient } from 'app/companies/models/CompanyClient';
import { AlertTriangle } from 'lucide-react';

type ClientsTableItemProps = {
    client: CompanyClient;
};

const ClientsTableItem = ({ client }: ClientsTableItemProps) => {
    return (
        <TableRow>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.firstName}</TableCell>
            <TableCell>{client.lastName}</TableCell>
            <TableCell>{client.phone}</TableCell>
            <TableCell>{client.devices.length}</TableCell>
            <TableCell>
                {client.devices.some(
                    (device) => device.leak || device.saltPercentage == 0,
                ) && <AlertTriangle />}
            </TableCell>
        </TableRow>
    );
};

export default ClientsTableItem;
