import { v4 as uuid } from 'uuid';

export class Product {
    id: string;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;

    constructor(data?: Partial<Product>) {
        this.id = data?.id ?? uuid();
        this.name = data?.name ?? '';
        this.quantity = data?.quantity ?? 0;
        this.price = data?.price ?? 0;
        this.imageUrl = data?.imageUrl ?? '';
    }
}
