import { Button, Card, Loader, Table } from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Company, CompanyStatus } from '../models/companies/Company';
import { api } from '../api/api';
import { RequireAuth } from '../components/auth/RequireAuth';

const Companies = () => {
    const queryClient = useQueryClient();
    const { data: companies, isLoading: companiesLoading } = useQuery(
        ['clients'],
        api.Companies.getAll,
    );

    const { mutate } = useMutation(api.Companies.confirmApplication, {
        onSuccess: () => queryClient.invalidateQueries(['clients']),
    });

    return (
        <RequireAuth>
            <Card shadow="md" radius="md" mx={20} p="xl" withBorder>
                {companiesLoading ? (
                    <Loader />
                ) : (
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies?.map((company: Company) => (
                                <tr key={company.id}>
                                    <td>{company.name}</td>
                                    <td>{company.code}</td>
                                    <td>{company.email}</td>
                                    <td>{company.phone}</td>
                                    <td>{company.status}</td>
                                    <td>
                                        {company.status ==
                                            CompanyStatus.ApplicationPending && (
                                            <Button
                                                onClick={() =>
                                                    mutate(
                                                        company.companyRegistrationId as string,
                                                    )
                                                }
                                            >
                                                Confirm Application
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card>
        </RequireAuth>
    );
};

export default Companies;
