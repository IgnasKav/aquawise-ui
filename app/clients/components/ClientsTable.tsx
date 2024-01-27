'use client';

import { Card } from '@/components/ui/card';
import {
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    Table,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { api } from 'api/api';
import { User } from 'app/auth/models/User';
import ClientsTableItem from './ClientsTableItem';

type ClientsTableProps = {
    user: User;
};

export default function ClientsTable({ user }: ClientsTableProps) {
    const { data: clients } = useQuery({
        queryKey: ['clients'],
        queryFn: () => api.Companies.getClients(user.company.id),
    });

    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>First name</TableHead>
                        <TableHead>Last name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Devices</TableHead>
                        <TableHead>Warnings</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clients?.map((c) => (
                        // return id from be
                        <ClientsTableItem key={c.email} client={c} />
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
