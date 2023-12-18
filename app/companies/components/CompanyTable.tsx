'use client';

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import CompanyTableItem from './CompanyTableItem';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { api } from 'api/api';

const CompanyTable = () => {
    const { data: companies } = useQuery({
        queryKey: ['companies'],
        queryFn: () => api.Companies.getAll(),
    });

    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companies?.map((c) => (
                        <CompanyTableItem key={c.id} company={c} />
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default CompanyTable;
