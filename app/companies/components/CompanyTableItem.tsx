'use client';

import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'api/api';
import { ApiError } from 'api/models/ApiError';
import { Company } from 'app/companies/models/Company';
import SpinnerIcon from 'app/shared/components/loaders/SpinnerIcon';
import { AlertDto } from 'components/alert/models/AlertDto';
import useAlert from 'stores/useAlert';

type CompanyTableItemProps = {
    company: Company;
};

const CompanyTableItem = ({ company }: CompanyTableItemProps) => {
    const [createAlert] = useAlert((state) => [state.createAlert]);
    const queryCLient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => api.Companies.confirmApplication(company.id),
        onSuccess: () => {
            queryCLient.invalidateQueries({ queryKey: ['companies'] });
            const alert = new AlertDto({
                type: 'success',
                title: 'Sucecss!',
                message: 'Company application confirmed',
            });

            createAlert(alert);
        },
        onError: (error: ApiError) => {
            createAlert(error.toAlert());
        },
    });

    return (
        <TableRow>
            <TableCell>{company.name}</TableCell>
            <TableCell>{company.code}</TableCell>
            <TableCell>{company.email}</TableCell>
            <TableCell>{company.phone}</TableCell>
            <TableCell>{company.status}</TableCell>
            {company.status === 'ApplicationPending' && (
                <TableCell>
                    <Button className="w-24" onClick={() => mutate()}>
                        {isPending ? <SpinnerIcon /> : 'Confirm'}
                    </Button>
                </TableCell>
            )}
        </TableRow>
    );
};

export default CompanyTableItem;
