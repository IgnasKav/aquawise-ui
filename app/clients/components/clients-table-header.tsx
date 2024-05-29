import { TableRow } from '@/components/ui/table';
import {
    HeaderCol,
    StringCol2,
} from 'app/shared/components/entity-table/table-col/table-col';

const ClientsTableHeader = () => {
    return (
        <TableRow>
            <HeaderCol value="#" />
            <HeaderCol value="Email" className="sticky top-0" />
            <HeaderCol value="Name" />
            <HeaderCol value="Type" className="hidden md:table-cell" />
            <HeaderCol value="Phone" className="hidden md:table-cell" />
            <HeaderCol value="Address" className="hidden md:table-cell" />
            <HeaderCol />
        </TableRow>
    );
};

const ClientsTableHeader2 = () => {
    return (
        <div className="flex border h-14 items-center gap-4 px-4">
            <StringCol2 className="flex-none w-5" value="#" />
            <StringCol2 className="flex-auto w-64" value="Email" />
            <StringCol2 className="flex-auto w-60" value="Name" />
            <StringCol2
                className="hidden xl:block flex-none w-24"
                value="Type"
            />
            <StringCol2
                className="hidden md:block flex-auto w-60"
                value="Phone"
            />
            <StringCol2
                className="hidden xl:block flex-auto w-60"
                value="Address"
            />
            <StringCol2 value="" />
        </div>
    );
};

export { ClientsTableHeader, ClientsTableHeader2 };
