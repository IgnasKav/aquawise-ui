'use client';

import { Card } from '@/components/ui/card';
import {
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    Table,
} from '@/components/ui/table';
import ClientsTableItem from './ClientsTableItem';
import { Client } from '../models/Client';

type ClientsTableProps = {
    clients: Client[];
};

export default function ClientsTable({ clients }: ClientsTableProps) {
    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Type</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clients.map((c) => (
                        // return id from be
                        <ClientsTableItem key={c.email} client={c} />
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
