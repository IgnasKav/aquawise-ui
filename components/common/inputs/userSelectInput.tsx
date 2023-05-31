import { Avatar, Group, Loader, Select, Text } from '@mantine/core';
import React, { forwardRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../api/api';
import useAuth from '../../../stores/useAuth';

interface Props {
    onChange: (value: string | null) => void;
    value: string | null;
}

export const UserSelectInput = ({ value, onChange }: Props) => {
    const [user, isLoading] = useAuth((state) => [state.user, state.isLoading]);
    const { data: company, isLoading: isCompanyLoading } = useQuery(
        ['company'],
        () => api.Companies.getById(user?.company.id ?? ''),
    );

    interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
        firstName: string;
        lastName: string;
    }

    const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
        ({ firstName, lastName, ...others }: ItemProps, ref) => (
            <div ref={ref} {...others}>
                <Group noWrap>
                    <Avatar variant="filled" size="md" color="teal" radius="xl">
                        {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
                    </Avatar>
                    <Text size="sm">{firstName + lastName}</Text>
                </Group>
            </div>
        ),
    );

    SelectItem.displayName = 'userSelectInputItem';

    return (
        <Select
            placeholder="Assignee"
            itemComponent={SelectItem}
            value={value}
            clearable={true}
            data={
                company?.users.map((user) => ({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    label: `${user.firstName} ${user.lastName}`,
                    value: user.id,
                })) || []
            }
            onChange={onChange}
            searchable
            maxDropdownHeight={400}
            nothingFound="Nobody here"
            rightSection={
                isCompanyLoading || (isLoading && <Loader size="xs" />)
            }
            filter={(value, item) =>
                item.firstName
                    .toLowerCase()
                    .includes(value.toLowerCase().trim()) ||
                item.lastName.toLowerCase().includes(value.toLowerCase().trim())
            }
        />
    );
};
