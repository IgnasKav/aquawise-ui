import { TableHead, TableRow } from '@/components/ui/table';

const ClientsTableHeader = () => {
    return (
        <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="hidden md:table-cell">Phone</TableHead>
            <TableHead className="hidden md:table-cell">Address</TableHead>
            <TableHead>
                <span className="sr-only">Actions</span>
            </TableHead>
        </TableRow>
    );
};

export { ClientsTableHeader };
