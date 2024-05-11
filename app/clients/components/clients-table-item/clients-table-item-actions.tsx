'use client';

import { Client } from 'app/clients/models/Client';
import {
    ActionsCol,
    EntityTableItemAction,
} from 'app/shared/components/entity-table/table-col/actions-col';

type ClientTableItemActionsProps = {
    client: Client;
};

const ClientsTableItemActions = ({ client }: ClientTableItemActionsProps) => {
    const actions: EntityTableItemAction[] = [
        {
            name: 'Edit',
            fn: () => {
                console.log('editing item', client);
            },
        },
        {
            name: 'Delete',
            fn: () => {
                console.log('deleting item');
            },
        },
    ];

    return <ActionsCol actions={actions} />;
};

export { ClientsTableItemActions };
