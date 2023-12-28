'use client';

import { Product } from '../../models/Product';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { DropZone } from 'app/shared/components/dropzone/DropZone';
import { forwardRef, useState } from 'react';
import { ImagePreview } from 'app/shared/components/dropzone/models/ImagePreview';
import { NumberInput } from 'app/shared/components/inputs/NumberInput';

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
});

type ProductFormDto = z.infer<typeof ProductFormSchema>;

interface ProductFormProps {
    product: Product;
    onSave: (formValues: ProductFormDto, images?: File[]) => void;
}

export const ProductForm = forwardRef<HTMLFormElement, ProductFormProps>(
    ({ product, onSave }, ref) => {
        const [images, setImages] = useState<ImagePreview[]>([]);

        const {
            register,
            formState: { errors },
            control,
            handleSubmit,
        } = useForm<ProductFormDto>({
            resolver: zodResolver(ProductFormSchema),
            defaultValues: product,
        });

        const onSubmit: SubmitHandler<ProductFormDto> = (data) => {
            onSave(data, images);
        };

        return (
            <form
                className="flex flex-col gap-2"
                ref={ref}
                onSubmit={handleSubmit(onSubmit)}
            >
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
                    control={control}
                    name="price"
                    label="Price"
                    error={errors.price?.message}
                    required
                />
                <DropZone title="Add images" onChange={setImages} />

                <button className="hidden" type="submit">
                    submit
                </button>
            </form>
        );
    },
);

ProductForm.displayName = 'ProductForm';
