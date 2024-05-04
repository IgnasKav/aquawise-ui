'use client';

import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

type Order = {
    id: string;
    title: string;
};

const testOrders: Order[] = [
    {
        id: 'id-1',
        title: 'Order 1',
    },
    {
        id: 'id-2',
        title: 'Order 2',
    },
    {
        id: 'id-3',
        title: 'Order 3',
    },
    {
        id: 'id-4',
        title: 'Order 4',
    },
    {
        id: 'id- 5',
        title: 'Order 5',
    },
];

type OrderListProps = {
    orders: Order[];
};

const OrderList = ({ orders }: OrderListProps) => {
    return orders.map((order, index) => (
        <Draggable key={order.id} draggableId={order.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="border rounded mt-2">{order.title}</div>
                </div>
            )}
        </Draggable>
    ));
};

const KanBanBoard = () => {
    const [orders, setOrders] = useState<Order[]>(testOrders);

    const handleDragEnd = () => {
        console.log('drag end');
    };

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="list">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <OrderList orders={orders} />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default KanBanBoard;
