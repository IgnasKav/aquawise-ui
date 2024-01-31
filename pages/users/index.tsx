import { Card, Loader, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/api';
import useAuth from '../../stores/useAuth';
import { User } from '../../app/auth/models/User';
import { UserInviteButton } from '../../components/users/UserInviteButton';

const Users = () => {
    const [user, isLoading] = useAuth((state) => [state.user, state.isLoading]);
    const { data: company, isLoading: isCompanyLoading } = useQuery(
        ['company'],
        () => api.Companies.getById(user?.company.id ?? ''),
        { enabled: !isLoading },
    );

    return (
        <Card shadow="md" radius="md" mx={20} p="xl" withBorder>
            {isCompanyLoading || isLoading ? (
                <Loader />
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>
                                <UserInviteButton />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {company?.users?.map((user: User) => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Card>
    );
};

export default Users;
