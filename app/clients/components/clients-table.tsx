import ClientsTableItem from './clients-table-item/clients-table-item';
import { Client } from '../models/Client';
import { ClientsTableHeader } from './clients-table-header';
import {
    EntityTable,
    EntityTableProps,
} from 'app/shared/components/entity-table/entity-table';

type ClientsTableProps = {
    clients: Client[];
};

export default function ClientsTable({ clients }: ClientsTableProps) {
    const clientsTableData: EntityTableProps = {
        title: 'Clients',
        description: 'Manage clients',
        header: <ClientsTableHeader />,
    };

    return (
        <>
            <EntityTable {...clientsTableData}>
                {clients.map((c) => (
                    <ClientsTableItem key={c.id} client={c} />
                ))}
            </EntityTable>
        </>
    );
}
