'use client';

import { Product } from '../../models/Product';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { DropZone } from 'app/shared/components/dropzone/DropZone';
import { forwardRef, useEffect } from 'react';
import { NumberInput } from 'app/shared/components/inputs/NumberInput';
import useImages from 'stores/useImages';
import { Subject } from 'rxjs';

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
    images: z
        .array(
            z.object({
                id: z.string().uuid(),
                imageUrl: z.string(),
            }),
        )
        .min(1, 'Product should have atleast one image'),
});

export type ProductFormDto = z.infer<typeof ProductFormSchema>;

interface ProductFormProps {
    id: string;
    product: Product | ProductFormDto;
    onSave: (formValues: ProductFormDto) => void;
    onCloseTrigger: Subject<void>;
}

export const ProductForm = forwardRef<HTMLFormElement, ProductFormProps>(
    ({ id, product, onSave, onCloseTrigger }, ref) => {
        const [setImages] = useImages((state) => [state.setImages]);

        const {
            register,
            formState: { errors },
            control,
            getValues,
            handleSubmit,
        } = useForm<ProductFormDto>({
            resolver: zodResolver(ProductFormSchema),
            defaultValues: {
                name: product.name,
                quantity: product.quantity,
                price: product.price,
                images: product.images,
            },
        });

        useEffect(() => {
            console.log('default values', getValues());
        }, [getValues]);

        useEffect(() => {
            const subscription = onCloseTrigger.subscribe(() => {
                console.log('Dialog closing');
                onClose();
            });

            return () => {
                subscription.unsubscribe();
            };
        }, [onCloseTrigger]);

        const onClose = () => {
            setImages([]);
        };

        const onSubmit: SubmitHandler<ProductFormDto> = (data) => {
            console.log('on submit');
            onSave(data);
        };

        return (
            <form
                id={id}
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
                <DropZone
                    control={control}
                    name="images"
                    title="Add images"
                    error={errors.images?.message}
                />
            </form>
        );
    },
);

ProductForm.displayName = 'ProductForm';
