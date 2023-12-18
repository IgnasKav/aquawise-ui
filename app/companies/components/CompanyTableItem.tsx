'use client';

import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'api/api';
import { Company, CompanyStatus } from 'models/companies/Company';

type CompanyTableItemProps = {
    company: Company;
};

const CompanyTableItem = ({ company }: CompanyTableItemProps) => {
    const queryCLient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: () => api.Companies.confirmApplication(company.id),
        onSuccess: () =>
            queryCLient.invalidateQueries({ queryKey: ['clients'] }),
    });

    return (
        <TableRow>
            <TableCell>{company.name}</TableCell>
            <TableCell>{company.code}</TableCell>
            <TableCell>{company.email}</TableCell>
            <TableCell>{company.phone}</TableCell>
            <TableCell>{company.status}</TableCell>
            {company.status === CompanyStatus.ApplicationPending && (
                <TableCell>
                    <Button onClick={() => mutate()}>Confirm</Button>
                </TableCell>
            )}
        </TableRow>
    );
};

export default CompanyTableItem;
