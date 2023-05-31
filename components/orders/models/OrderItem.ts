import { v4 as uuid } from 'uuid';
import { Product } from '../../products/models/Product';

export class OrderItem {
    id: string;
    description?: string;
    quantity?: number;
    price?: number;
    product?: Product;

    constructor(data?: Partial<OrderItem>) {
        this.id = data?.id ?? uuid();
        this.description = data?.description;
        this.quantity = data?.quantity;
        this.price = data?.price;
        this.product = data?.product;
    }
}
