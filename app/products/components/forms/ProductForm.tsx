'use client';

import { Product } from '../../models/Product';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { NumberInput } from 'components/common/inputs/NumberInput';
import { DropZone } from 'components/common/dropzone/NewDropZone';

// const useProductForm = (product: Product): UseFormReturnType<ProductFormDto> =>
//     useForm({
//         initialValues: new ProductFormDto(product),
//         validate: {
//             quantity: (val: number) =>
//                 val >= 0 ? null : 'Quantity can not be lower than 0',
//             price: (val: number) =>
//                 val >= 0 ? null : 'Price can not be lower than 0',
//         },
//     });

const ProductFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    quantity: z
        .string()
        .min(1, 'Quantity is required')
        .transform((val) => parseFloat(val))
        .refine(
            (val) => !isNaN(val) && val >= 0,
            'Quantity must be greater than 0',
        )
        .refine((val) => val % 1 === 0, 'Quantity must be an integer'),
    price: z
        .string()
        .min(1, 'Price is required')
        .transform((val) => parseFloat(val))
        .refine(
            (val) => !isNaN(val) && val >= 0,
            'Price must be greater than 0',
        ),
    // imageUrl: z.string().optional(),
});

type ProductFormDto = z.infer<typeof ProductFormSchema>;

interface ProductFormProps {
    product: Product;
    onSave: (formValues: ProductFormDto, image?: File) => void;
}

export const ProductForm = ({ product, onSave }: ProductFormProps) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<ProductFormDto>({
        resolver: zodResolver(ProductFormSchema),
    });
    // const [image, setImage] = useState<File | undefined>(undefined);

    // const form = useProductForm(product);

    // const handleDrop = (image: File) => {
    //     setImage(image);
    // };

    const onSubmit: SubmitHandler<ProductFormDto> = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                id="product-name"
                label="Product name"
                type="text"
                {...register('name')}
                error={errors.name?.message}
                required
            />
            <Input
                id="quantity"
                label="Quantity"
                type="number"
                {...register('quantity')}
                error={errors.quantity?.message}
                required
            />
            <NumberInput
                id="price"
                label="Price"
                {...register('price')}
                error={errors.price?.message}
                required
            />
            <DropZone title="Add images" />
        </form>
    );
};
