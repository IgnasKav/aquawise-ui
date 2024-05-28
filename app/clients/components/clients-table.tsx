import ClientsTableItem from './clients-table-item/clients-table-item';
import { Client } from '../models/Client';
import { ClientsTableHeader } from './clients-table-header';
import {
    EntityTable,
    EntityTableProps,
} from 'app/shared/components/entity-table/entity-table';
import { ClientsTableFilters } from './clients-table-filters';
import { ClientsPageSearchParams } from '../page';

type ClientsTableProps = {
    clients: Client[];
    page: number;
    pageSize: number;
    total: number;
    searchParams: ClientsPageSearchParams;
};

export default function ClientsTable({
    clients,
    page,
    pageSize,
    total,
    searchParams,
}: ClientsTableProps) {
    const clientsTableData: EntityTableProps = {
        entityName: 'Clients',
        header: <ClientsTableHeader />,
        page,
        pageSize,
        total,
    };

    const itemsFrom = page * pageSize - pageSize + 1;

    return (
        <>
            <ClientsTableFilters searchParams={searchParams} />
            <EntityTable className="mt-4 mb-8" {...clientsTableData}>
                {clients.map((c, i) => (
                    <ClientsTableItem
                        index={itemsFrom + i}
                        key={c.id}
                        client={c}
                    />
                ))}
            </EntityTable>
        </>
    );
}
