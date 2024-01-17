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
import { useMutation } from '@tanstack/react-query';
import { api } from 'api/api';

const ProductFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    quantity: z
        .number()
        .min(1, 'Quantity is required and should be greater than 0'),
    price: z.number().min(1, 'Price is required and should be greater than 0'),
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
    onCloseSubject: Subject<void>;
    onSubmitSubject: Subject<void>;
}

export const ProductForm = forwardRef<HTMLFormElement, ProductFormProps>(
    ({ id, product, onSave, onCloseSubject, onSubmitSubject }, ref) => {
        const [images, setImages] = useImages((state) => [
            state.images,
            state.setImages,
        ]);

        const { mutate: deleteImages } = useMutation({
            mutationFn: api.Images.delete,
        });

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
            const productImages = getValues('images');

            if (!productImages) return;

            setImages(productImages);
        }, [getValues, setImages]);

        useEffect(() => {
            const subscription = onCloseSubject.subscribe(() => {
                const imagesWithoutRelation = images.filter(
                    (image) => !image.productId,
                );

                if (imagesWithoutRelation.length > 0) {
                    deleteImages({ images: imagesWithoutRelation });
                }

                setImages([]);
            });

            return () => {
                subscription.unsubscribe();
            };
        }, [onCloseSubject, images, setImages]);

        const onSubmit: SubmitHandler<ProductFormDto> = async (data) => {
            await onSave(data);
            onSubmitSubject.next();
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
                    {...register('name')}
                    error={errors.name?.message}
                    required
                />
                <NumberInput
                    control={control}
                    name="quantity"
                    label="Quantity"
                    type="int"
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
