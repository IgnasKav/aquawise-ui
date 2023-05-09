export class CreateProductRequestDto {
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;

    constructor(data?: Partial<CreateProductRequestDto>) {
        this.name = data?.name ?? '';
        this.quantity = data?.quantity ?? 0;
        this.price = data?.price ?? 0;
        this.imageUrl = data?.imageUrl ?? '';
    }
}
