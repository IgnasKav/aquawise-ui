export type Product = {
    id: string;
    name: string;
    quantity: number;
    price: number;
    images?: ProductImage[];
};

export type ProductImage = {
    id: string;
    imageUrl: string;
    productId?: string;
};
