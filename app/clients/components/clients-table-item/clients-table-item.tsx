import { Client } from '../../models/Client';
import {
    StatusCol,
    StringCol,
} from 'app/shared/components/entity-table/table-col/table-col';
import { ClientsTableItemActions } from './clients-table-item-actions';

type ClientsTableItemProps = {
    client: Client;
    index: number;
};

const ClientsTableItem = ({ client, index }: ClientsTableItemProps) => {
    return (
        <div className="flex h-14 items-center gap-4 px-4">
            <StringCol className="flex-none w-5" value={index} />
            <StringCol className="flex-auto w-64" value={client.email} />
            <StringCol className="flex-auto w-60" value={client.name} />
            <StatusCol
                className="hidden xl:block flex-none w-24"
                value={client.type}
            />
            <StringCol
                className="hidden md:block flex-auto w-60"
                value={client.phone}
            />
            <StringCol
                className="hidden xl:block flex-auto w-60"
                value={client.address}
            />
            <ClientsTableItemActions client={client} />
        </div>
    );
};

export { ClientsTableItem };
