import ClientsTableItem from './clients-table-item/clients-table-item';
import { Client } from '../models/Client';
import { ClientsTableHeader } from './clients-table-header';
import {
    EntityTable,
    EntityTableProps,
} from 'app/shared/components/entity-table/entity-table';
import {
    StatusFilter,
    StatusFilterOption,
} from 'app/shared/components/entity-table/filter/status-filter';

type ClientsTableProps = {
    clients: Client[];
    page: number;
    pageSize: number;
    total: number;
};

const options: StatusFilterOption[] = [
    { label: 'Client', value: 'client', isSelected: false },
    { label: 'Company', value: 'company', isSelected: false },
];

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

    const itemsFrom = page * pageSize - pageSize + 1;

    return (
        <>
            <StatusFilter title="Status" options={options} />
            <EntityTable {...clientsTableData}>
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
