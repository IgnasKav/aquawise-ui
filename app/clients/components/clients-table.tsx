import { Client } from '../models/Client';
import { ClientsTableFilters } from './clients-table-filters';
import { ClientsPageSearchParams } from '../page';
import {
    EntityTable,
    EntityTableProps,
} from 'app/shared/components/entity-table/entity-table';
import {
    EntityTableColProps,
    EntityTableRow,
} from 'app/shared/components/entity-table/table-row/table-row';
import { EntityTableItemAction } from 'app/shared/components/entity-table/table-col/actions-col';

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
    const getActions = (client: Client): EntityTableItemAction[] => [
        {
            name: 'Edit',
            fn: async () => {
                'use server';
                console.log('editing item', client);
            },
        },
        {
            name: 'Delete',
            fn: async () => {
                'use server';
                console.log('deleting item');
            },
        },
    ];

    const headerData: EntityTableColProps[] = [
        { type: 'string', value: '#', className: 'flex-none w-5' },
        { type: 'string', value: 'Email', className: 'flex-auto w-64' },
        { type: 'string', value: 'Name', className: 'flex-auto w-60' },
        {
            type: 'string',
            value: 'Type',
            className: 'hidden xl:block flex-none w-24',
        },
        {
            type: 'string',
            value: 'Phone',
            className: 'hidden md:block flex-auto w-60',
        },
        {
            type: 'string',
            value: 'Address',
            className: 'hidden xl:block flex-auto w-60',
        },
        { type: 'string', value: '', className: 'w-[40px]' },
    ];

    const getItem = (index: number, c: Client): EntityTableColProps[] => [
        { type: 'string', value: index, className: 'flex-none w-5' },
        { type: 'string', value: c.email, className: 'flex-auto w-64' },
        { type: 'string', value: c.name, className: 'flex-auto w-60' },
        {
            type: 'status',
            value: c.type,
            className: 'hidden xl:block flex-none w-24',
        },
        {
            type: 'string',
            value: c.phone,
            className: 'hidden md:block flex-auto w-60',
        },
        {
            type: 'string',
            value: c.address,
            className: 'hidden xl:block flex-auto w-60',
        },
        { type: 'actions', actions: getActions(c) },
    ];

    const itemsFrom = page * pageSize - pageSize + 1;

    const clientsTableData: EntityTableProps = {
        entityName: 'Clients',
        headerData,
        page,
        pageSize,
        total,
    };

    return (
        <>
            <ClientsTableFilters searchParams={searchParams} />
            <EntityTable className="mt-4" {...clientsTableData}>
                <>
                    {clients.map((c, i) => (
                        <EntityTableRow
                            key={c.id}
                            cols={getItem(itemsFrom + i, c)}
                        />
                    ))}
                </>
            </EntityTable>
        </>
    );
}
