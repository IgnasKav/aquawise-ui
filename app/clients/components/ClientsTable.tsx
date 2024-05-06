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
    console.log('user', user);

    const { data } = useQuery({
        queryKey: ['clients'],
        queryFn: () =>
            api.Clients.searchClientsByCompany({
                companyId: user.company.id,
                page: 1,
                pageSize: 10,
            }),
    });

    console.log('data', data);

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
                    {data?.data?.map((c) => (
                        // return id from be
                        <ClientsTableItem key={c.email} client={c} />
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
