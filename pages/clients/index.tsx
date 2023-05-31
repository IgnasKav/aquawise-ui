import { Accordion, Card, Loader, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { AiOutlineWarning } from 'react-icons/ai';
import { api } from '../../api/api';
import { RequireAuth } from '../../components/auth/RequireAuth';
import useAuth from '../../stores/useAuth';
import { ClientModalButton } from '../../components/clients/ClientModalButton';

const CompanyClients = () => {
    const [user, isLoading] = useAuth((state) => [state.user, state.isLoading]);
    const { data: companyClients, isLoading: companiesLoading } = useQuery(
        ['companyClients'],
        () => api.Companies.getClients(user?.company?.id ?? ''),
        { enabled: user?.company.id != null },
    );

    return (
        <RequireAuth>
            <Card shadow="md" radius="md" p="xl" withBorder>
                {companiesLoading || isLoading ? (
                    <Loader />
                ) : (
                    <Table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Phone</th>
                                <th>Devices</th>
                                <th>Warnings</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companyClients?.map((client) => (
                                <tr key={client.email}>
                                    <td>{client.email}</td>
                                    <td>{client.firstName}</td>
                                    <td>{client.lastName}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.devices.length}</td>
                                    <td>
                                        {client.devices.some(
                                            (device) =>
                                                device.leak ||
                                                device.saltPercentage == 0,
                                        ) && <AiOutlineWarning />}
                                    </td>
                                    {client.devices.length > 0 && (
                                        <ClientModalButton
                                            devices={client.devices}
                                        />
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card>
        </RequireAuth>
    );
};

export default CompanyClients;
