import { RequireAuth } from '../../components/auth/RequireAuth';
import {
    Center,
    Container,
    Divider,
    Group,
    Loader,
    MediaQuery,
    SegmentedControl,
    Stack,
} from '@mantine/core';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/api';
import useAuth from '../../stores/useAuth';
import { OrdersColumn } from '../../components/orders/ordersColumn';
import { OrderStatus } from '../../components/orders/models/Order';

const OrdersPage = () => {
    const [user, isLoading] = useAuth((state) => [state.user, state.isLoading]);
    const { data: orders, isLoading: isOrdersLoading } = useQuery(
        ['orders'],
        () => api.Companies.getOrders(user?.company.id ?? ''),
        { enabled: !isLoading },
    );
    const [selectedColumn, setSelectedColumn] = useState(OrderStatus.Todo);

    return (
        <RequireAuth>
            <Container px={0} style={{ height: '80%' }}>
                {isLoading || isOrdersLoading ? (
                    <Center>
                        <Loader />
                    </Center>
                ) : (
                    <>
                        <MediaQuery
                            smallerThan="sm"
                            styles={{ display: 'none' }}
                        >
                            <Group
                                align={'flex-start'}
                                style={{ height: '100%' }}
                            >
                                <Divider
                                    variant="dotted"
                                    size={'xl'}
                                    orientation="vertical"
                                />
                                <OrdersColumn
                                    title={'Todo'}
                                    orders={
                                        orders?.filter(
                                            (order) =>
                                                order.status ==
                                                OrderStatus.Todo,
                                        ) || []
                                    }
                                />
                                <Divider
                                    variant="dotted"
                                    size={'xl'}
                                    orientation="vertical"
                                />
                                <OrdersColumn
                                    title={'In Progress'}
                                    orders={
                                        orders?.filter(
                                            (order) =>
                                                order.status ==
                                                OrderStatus.InProgress,
                                        ) || []
                                    }
                                />
                                <Divider
                                    variant="dotted"
                                    size={'xl'}
                                    orientation="vertical"
                                />
                                <OrdersColumn
                                    title={'Done'}
                                    orders={
                                        orders?.filter(
                                            (order) =>
                                                order.status ==
                                                OrderStatus.Done,
                                        ) || []
                                    }
                                />
                            </Group>
                        </MediaQuery>
                        <MediaQuery
                            largerThan="sm"
                            styles={{ display: 'none' }}
                        >
                            <Stack>
                                <SegmentedControl
                                    value={selectedColumn}
                                    onChange={(value) =>
                                        setSelectedColumn(
                                            OrderStatus[
                                                value as keyof typeof OrderStatus
                                            ],
                                        )
                                    }
                                    data={[
                                        {
                                            label: 'Todo',
                                            value: OrderStatus.Todo,
                                        },
                                        {
                                            label: 'In Progress',
                                            value: OrderStatus.InProgress,
                                        },
                                        {
                                            label: 'Done',
                                            value: OrderStatus.Done,
                                        },
                                    ]}
                                />
                                <Center>
                                    <OrdersColumn
                                        title={''}
                                        orders={
                                            orders?.filter(
                                                (order) =>
                                                    order.status ==
                                                    selectedColumn,
                                            ) || []
                                        }
                                    />
                                </Center>
                            </Stack>
                        </MediaQuery>
                    </>
                )}
            </Container>
        </RequireAuth>
    );
};

export default OrdersPage;
