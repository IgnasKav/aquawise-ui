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
import { Company } from '../models/Company';

type CompanyTableProps = {
    companies: Company[];
};

const CompanyTable = ({ companies }: CompanyTableProps) => {
    return (
        <>
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
                        {companies.map((c) => (
                            <CompanyTableItem key={c.id} company={c} />
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </>
    );
};

export default CompanyTable;
