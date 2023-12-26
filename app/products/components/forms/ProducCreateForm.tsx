'use client';

import { Button } from '@mantine/core';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Alert, AlertType } from '../../../../models/Alert';
import useAlert from '../../../../stores/useAlert';
import { Product } from '../../models/Product';
import { ProductFormDto } from '../../models/ProductForm.dto';
import { ProductForm } from './ProductForm';
import { ApiError } from '../../../../models/ApiError';
import { api } from 'api/api';

interface Props {
    onSave?: () => void;
}

const useCreateProduct = (onSave?: () => void) => {
    const queryClient = useQueryClient();
    const [createAlert] = useAlert((state) => [state.createAlert]);

    const mutation = useMutation({
        mutationFn: api.Products.create,
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
            await queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error: ApiError) => {
            createAlert(error.toAlert());
        },
    });

    return mutation;
};

export const ProductCreateForm = (props: Props) => {
    const { mutate: createProduct } = useCreateProduct(props.onSave);
    const product = new Product();

    const handleSave = async (values: ProductFormDto, image?: File) => {
        if (!image) return;

        const formData = new FormData();
        formData.append('image', new Blob([image]), image.name);

        const productData = JSON.stringify(values);
        formData.append('product', productData);

        createProduct(formData);
    };

    return (
        <ProductForm product={product} {...props} onSave={handleSave}>
            <Button w={140} type="submit" radius="xl">
                Create Product
            </Button>
        </ProductForm>
    );
};
