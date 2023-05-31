import { Order, OrderStatus } from './models/Order';
import {
    Card,
    Divider,
    Group,
    ScrollArea,
    Select,
    Stack,
    Text,
} from '@mantine/core';
import React from 'react';
import { UserSelectInput } from '../common/inputs/userSelectInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api, parseError } from '../../api/api';
import { AxiosError } from 'axios';
import useAlert from '../../stores/useAlert';
import { OrderUpdateRequest } from './models/OrderUpdateRequest';

interface Props {
    title: string;
    orders: Order[];
}

interface OrderUpdateMutation {
    companyId: string;
    clientId: string;
    orderId: string;
    request: OrderUpdateRequest;
}

export const OrdersColumn = ({ title, orders }: Props) => {
    const queryClient = useQueryClient();
    const [createAlert] = useAlert((state) => [state.createAlert]);
    const { mutate: updateOrder } = useMutation(
        ({ companyId, clientId, orderId, request }: OrderUpdateMutation) =>
            api.Orders.update(companyId, clientId, orderId, request),
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(['orders']);
            },
            onError: (error: AxiosError) => {
                const alert = parseError(error).toAlert();
                createAlert(alert);
            },
        },
    );

    return (
        <Stack w={280} justify="flex-start">
            <Text>{title}</Text>
            <ScrollArea offsetScrollbars={true} h={'75vh'}>
                <Stack>
                    {orders.map((order) => (
                        <Card
                            key={order.id}
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                        >
                            <Stack>
                                <Text>{order.serialNumber}</Text>
                                <Text>{`Address: ${order.client.address}`}</Text>
                                <Text>{`Phone: ${order.client.phone}`}</Text>
                                <Divider size={'md'} orientation="horizontal" />
                                {order.items.map((item) => (
                                    <Stack key={item.id}>
                                        {item.description && (
                                            <Stack>
                                                <Text>Request</Text>
                                                <Text>{item.description}</Text>
                                            </Stack>
                                        )}
                                        {item.product && (
                                            <Stack>
                                                <Text>{item.product.name}</Text>
                                                <Group>
                                                    <Text>
                                                        {`Quantity: ${item.quantity}`}
                                                    </Text>
                                                    <Text>
                                                        {`Price: ${item.product.price}€`}
                                                    </Text>
                                                </Group>
                                            </Stack>
                                        )}
                                        <Divider
                                            size={'md'}
                                            orientation="horizontal"
                                        />
                                    </Stack>
                                ))}
                                <Text>{`Total: ${order.items.reduce(function (
                                    acc,
                                    obj,
                                ) {
                                    return acc + (obj.price ?? 0);
                                },
                                0)}€`}</Text>
                                <UserSelectInput
                                    value={order.responsibleUser?.id ?? null}
                                    onChange={(value) =>
                                        updateOrder({
                                            companyId: order.client.company.id,
                                            clientId: order.client.id,
                                            orderId: order.id,
                                            request: new OrderUpdateRequest(
                                                undefined,
                                                value ?? undefined,
                                            ),
                                        })
                                    }
                                />
                                <Select
                                    placeholder="Change status"
                                    value={order.status}
                                    defaultValue={OrderStatus.Todo}
                                    onChange={(value) =>
                                        updateOrder({
                                            companyId: order.client.company.id,
                                            clientId: order.client.id,
                                            orderId: order.id,
                                            request: new OrderUpdateRequest(
                                                OrderStatus[
                                                    value as keyof typeof OrderStatus
                                                ],
                                            ),
                                        })
                                    }
                                    data={[
                                        {
                                            value: OrderStatus.Todo,
                                            label: 'Todo',
                                        },
                                        {
                                            value: OrderStatus.InProgress,
                                            label: 'In Progress',
                                        },
                                        {
                                            value: OrderStatus.Done,
                                            label: 'Done',
                                        },
                                    ]}
                                />
                            </Stack>
                        </Card>
                    ))}
                </Stack>
            </ScrollArea>
        </Stack>
    );
};
