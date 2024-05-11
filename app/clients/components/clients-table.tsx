import ClientsTableItem from './clients-table-item/clients-table-item';
import { Client } from '../models/Client';
import { ClientsTableHeader } from './clients-table-header';
import {
    EntityTable,
    EntityTableProps,
} from 'app/shared/components/entity-table/entity-table';
import { ClientTableFooter } from './client-table-footer';

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
        title: 'Clients',
        description: 'Manage clients',
        header: <ClientsTableHeader />,
        footer: (
            <ClientTableFooter page={page} pageSize={pageSize} total={total} />
        ),
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
