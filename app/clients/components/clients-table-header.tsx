import { TableRow } from '@/components/ui/table';
import { HeaderCol } from 'app/shared/components/entity-table/table-col/table-col';

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

export { ClientsTableHeader };
