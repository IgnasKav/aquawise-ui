'use client';

import {
    ActionsCol,
    EntityTableItemAction,
} from 'app/shared/components/entity-table/table-col/actions-col';

const OrdersTableItemsActions = () => {
    const actions: EntityTableItemAction[] = [
        {
            name: 'Edit',
            fn: () => {
                console.log('editing item');
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

export { OrdersTableItemsActions };
