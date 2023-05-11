export class ProductFormDto {
    name: string;
    quantity: number;
    price: number;

    constructor(data?: Partial<ProductFormDto>) {
        this.name = data?.name ?? '';
        this.quantity = data?.quantity ?? 0;
        this.price = data?.price ?? 0;
    }
}
