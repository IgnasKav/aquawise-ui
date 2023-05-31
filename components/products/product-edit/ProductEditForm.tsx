import { Product } from '../models/Product';
import { useForm, UseFormReturnType } from '@mantine/form';
import { ProductFormDto } from '../models/ProductForm.dto';
import { Button, NumberInput, Stack, TextInput } from '@mantine/core';
import { api, ApiUrl, parseError } from '../../../api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert, AlertType } from '../../../models/Alert';
import useAlert from '../../../stores/useAlert';
import { AxiosError } from 'axios';
import { DropZoneComponent } from '../../common/dropzone/DropZone';
import { useState } from 'react';
import { ProductQueryKeys } from '../models/ProductQueryKeys';

interface Props {
    isCreateForm: boolean;
    product: Product;
    onSave?: () => void;
}

const useCreateProduct = (onSave?: () => void) => {
    const queryClient = useQueryClient();
    const [createAlert] = useAlert((state) => [state.createAlert]);

    return useMutation(api.Products.create, {
        onSuccess: async () => {
            const alert = new Alert({
                message: 'Product created',
                type: AlertType.success,
                title: 'Success!',
            });

            if (onSave) {
                onSave();
            }

            createAlert(alert);
            await queryClient.invalidateQueries([ProductQueryKeys.ProductList]);
        },
        onError: (error: AxiosError) => {
            const alert = parseError(error).toAlert();
            createAlert(alert);
        },
    });
};

interface ProductUpdateMutation {
    productId: string;
    product: FormData;
}

const useProductEdit = (onSave?: () => void) => {
    const queryClient = useQueryClient();
    const [createAlert] = useAlert((state) => [state.createAlert]);

    return useMutation(
        ({ productId, product }: ProductUpdateMutation) =>
            api.Products.update(productId, product),
        {
            onSuccess: async () => {
                const alert = new Alert({
                    message: 'Product edited',
                    type: AlertType.success,
                    title: 'Success!',
                });

                if (onSave) {
                    onSave();
                }

                createAlert(alert);
                await queryClient.invalidateQueries([
                    ProductQueryKeys.ProductList,
                ]);
            },
            onError: (error: AxiosError) => {
                const alert = parseError(error).toAlert();
                createAlert(alert);
            },
        },
    );
};

const useProductForm = (product: Product): UseFormReturnType<ProductFormDto> =>
    useForm({
        initialValues: new ProductFormDto(product),
        validate: {
            quantity: (val: number) =>
                val >= 0 ? null : 'Quantity can not be lower than 0',
            price: (val: number) =>
                val >= 0 ? null : 'Price can not be lower than 0',
        },
    });

export const ProductEditForm = ({ isCreateForm, product, onSave }: Props) => {
    const [image, setImage] = useState<File | null>(null);

    const form = useProductForm(product);
    const { mutate: createProduct } = useCreateProduct(onSave);
    const { mutate: editProduct } = useProductEdit(onSave);

    const handleDrop = (image: File) => {
        setImage(image);
    };

    const handleSave = async () => {
        if (isCreateForm && !image) return;

        const formData = new FormData();
        if (image) {
            formData.append('image', new Blob([image]), image.name);
        }

        const productData = JSON.stringify(form.values);
        formData.append('product', productData);

        if (isCreateForm) {
            createProduct(formData);
        } else {
            editProduct({ productId: product.id, product: formData });
        }
    };

    return (
        <form onSubmit={form.onSubmit(() => handleSave())}>
            <Stack>
                <TextInput
                    required
                    label="Product name"
                    placeholder="Name"
                    radius="md"
                    {...form.getInputProps('name')}
                />
                <NumberInput
                    placeholder="Quantity"
                    label="Quantity"
                    withAsterisk
                    radius="md"
                    {...form.getInputProps('quantity')}
                />
                <NumberInput
                    placeholder="Price"
                    label="Price"
                    withAsterisk
                    radius="md"
                    {...form.getInputProps('price')}
                />
                <DropZoneComponent
                    onDrop={handleDrop}
                    imageUrl={`${ApiUrl}/${product.imageUrl}`}
                />
                <Button w={140} type="submit" radius="xl">
                    {isCreateForm ? 'Create Product' : 'Edit Product'}
                </Button>
            </Stack>
        </form>
    );
};
