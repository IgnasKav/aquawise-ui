import ClientsTableItem from './clients-table-item/clients-table-item';
import { Client } from '../models/Client';
import { ClientsTableHeader } from './clients-table-header';
import {
    EntityTable,
    EntityTableProps,
} from 'app/shared/components/entity-table/entity-table';

type ClientsTableProps = {
    clients: Client[];
    page: number;
    pageSize: number;
    total: number;
};

export default function ClientsTable({
    clients,
    page,
    pageSize,
    total,
}: ClientsTableProps) {
    const clientsTableData: EntityTableProps = {
        entityName: 'Clients',
        description: 'Manage clients',
        header: <ClientsTableHeader />,
        page,
        pageSize,
        total,
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
