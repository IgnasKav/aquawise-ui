import { Client } from '../../models/Client';
import {
    StatusCol2,
    StringCol2,
} from 'app/shared/components/entity-table/table-col/table-col';

type ClientsTableItemProps = {
    client: Client;
    index: number;
};

const ClientsTableListItem = ({ client, index }: ClientsTableItemProps) => {
    return (
        <div className="flex border h-14 items-center gap-4 px-4">
            <StringCol2 className="flex-none w-5" value={index} />
            <StringCol2 className="flex-auto w-64" value={client.email} />
            <StringCol2 className="flex-auto w-60" value={client.name} />
            <StatusCol2
                className="hidden xl:block flex-none w-24"
                value={client.type}
            />
            <StringCol2
                className="hidden md:block flex-auto w-60"
                value={client.phone}
            />
            <StringCol2
                className="hidden xl:block flex-auto w-60"
                value={client.address}
            />
            <div>a</div>
        </div>
    );
};

export { ClientsTableListItem };
