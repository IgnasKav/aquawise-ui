import { v4 as uuid } from 'uuid';
import { Client } from '../../../app/clients/models/Client';
import { OrderItem } from './OrderItem';
import { User } from '../../../models/User';

export class Order {
    id: string;
    serialNumber: string;
    status: OrderStatus;
    client: Client;
    responsibleUser?: User;
    items: OrderItem[];

    constructor(data?: Partial<Order>) {
        this.id = data?.id ?? uuid();
        this.serialNumber = data?.serialNumber ?? '';
        this.status = data?.status ?? OrderStatus.Todo;
        this.client = data?.client ?? new Client();
        this.responsibleUser = data?.responsibleUser;
        this.items = data?.items ?? [];
    }
}

export enum OrderStatus {
    Todo = 'Todo',
    InProgress = 'InProgress',
    Done = 'Done',
}
