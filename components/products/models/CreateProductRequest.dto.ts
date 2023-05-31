import { ProductFormDto } from './ProductForm.dto';

export interface CreateProductRequestDto {
    image: Blob;
    product: ProductFormDto;
}
