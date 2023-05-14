import { RequireAuth } from '../../components/auth/RequireAuth';
import {
    Avatar,
    Card,
    Container,
    Divider,
    Group,
    ScrollArea,
    Select,
    Stack,
    Text,
} from '@mantine/core';
import React, { forwardRef } from 'react';

const OrdersPage = () => {
    const users = [
        {
            firstName: 'George',
            lastName: 'Foster',
            label: 'George Foster',
            value: 'GF',
        },
        {
            firstName: 'Luke',
            lastName: 'Kramer',
            label: 'Luke Kramer',
            value: 'LK',
        },
    ];

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

    return (
        <RequireAuth>
            <Container style={{ height: '80%' }}>
                <Group align={'flex-start'} style={{ height: '100%' }}>
                    <Stack w={250} justify="flex-start">
                        <Text>{'Todo'}</Text>
                        <ScrollArea offsetScrollbars={true} h={500}>
                            <Stack>
                                <Card
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                >
                                    <Stack>
                                        <Text>Order name</Text>
                                        <Text>Order Product1</Text>
                                        <Text>Order Product2</Text>
                                        <Text>Order Product3</Text>
                                        <Select
                                            placeholder="Assignee"
                                            itemComponent={SelectItem}
                                            data={users}
                                            searchable
                                            maxDropdownHeight={400}
                                            nothingFound="Nobody here"
                                            filter={(value, item) =>
                                                item.firstName
                                                    .toLowerCase()
                                                    .includes(
                                                        value
                                                            .toLowerCase()
                                                            .trim(),
                                                    ) ||
                                                item.lastName
                                                    .toLowerCase()
                                                    .includes(
                                                        value
                                                            .toLowerCase()
                                                            .trim(),
                                                    )
                                            }
                                        />
                                        <Select
                                            placeholder="Change status"
                                            data={[
                                                {
                                                    value: 'Todo',
                                                    label: 'Todo',
                                                },
                                                {
                                                    value: 'InProgress',
                                                    label: 'In Progress',
                                                },
                                                {
                                                    value: 'Done',
                                                    label: 'Done',
                                                },
                                            ]}
                                        />
                                    </Stack>
                                </Card>
                                <Card
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                >
                                    <Stack>
                                        <Text>Order name</Text>
                                        <Text>Order Product1</Text>
                                        <Text>Order Product2</Text>
                                    </Stack>
                                </Card>
                                <Card
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                >
                                    <Stack>
                                        <Text>Order name</Text>
                                        <Text>Order Product1</Text>
                                        <Text>Order Product2</Text>
                                    </Stack>
                                </Card>
                                <Card
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                >
                                    <Stack>
                                        <Text>Order name</Text>
                                        <Text>Order Product1</Text>
                                        <Text>Order Product2</Text>
                                    </Stack>
                                </Card>
                            </Stack>
                        </ScrollArea>
                    </Stack>
                    <Divider
                        variant="dotted"
                        size={'xl'}
                        orientation="vertical"
                    />
                    <Stack w={250} justify="flex-start">
                        <Text>{'In progress'}</Text>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Stack>
                                <Text>Order name</Text>
                                <Text>Order Product1</Text>
                                <Text>Order Product2</Text>
                                <Text>Order Product3</Text>
                                <Select
                                    placeholder="Assignee"
                                    itemComponent={SelectItem}
                                    data={users}
                                    searchable
                                    maxDropdownHeight={400}
                                    nothingFound="Nobody here"
                                    filter={(value, item) =>
                                        item.firstName
                                            .toLowerCase()
                                            .includes(
                                                value.toLowerCase().trim(),
                                            ) ||
                                        item.lastName
                                            .toLowerCase()
                                            .includes(
                                                value.toLowerCase().trim(),
                                            )
                                    }
                                />
                                <Select
                                    placeholder="Change status"
                                    data={[
                                        { value: 'Todo', label: 'Todo' },
                                        {
                                            value: 'InProgress',
                                            label: 'In Progress',
                                        },
                                        { value: 'Done', label: 'Done' },
                                    ]}
                                />
                            </Stack>
                        </Card>
                    </Stack>
                    <Divider
                        variant="dotted"
                        size={'xl'}
                        orientation="vertical"
                    />
                    <Stack w={250} justify="flex-start">
                        <Text>{'Done'}</Text>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Stack>
                                <Text>Order name</Text>
                                <Text>Order Product1</Text>
                                <Text>Order Product2</Text>
                                <Text>Order Product3</Text>
                                <Select
                                    placeholder="Assignee"
                                    itemComponent={SelectItem}
                                    data={users}
                                    searchable
                                    maxDropdownHeight={400}
                                    nothingFound="Nobody here"
                                    filter={(value, item) =>
                                        item.firstName
                                            .toLowerCase()
                                            .includes(
                                                value.toLowerCase().trim(),
                                            ) ||
                                        item.lastName
                                            .toLowerCase()
                                            .includes(
                                                value.toLowerCase().trim(),
                                            )
                                    }
                                />
                                <Select
                                    placeholder="Change status"
                                    data={[
                                        { value: 'Todo', label: 'Todo' },
                                        {
                                            value: 'InProgress',
                                            label: 'In Progress',
                                        },
                                        { value: 'Done', label: 'Done' },
                                    ]}
                                />
                            </Stack>
                        </Card>
                    </Stack>
                </Group>
            </Container>
        </RequireAuth>
    );
};

export default OrdersPage;
