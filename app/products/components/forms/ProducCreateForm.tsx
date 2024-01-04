'use client';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Alert, AlertType } from '../../../../models/Alert';
import useAlert from '../../../../stores/useAlert';
import { ProductFormDto } from '../../models/ProductForm.dto';
import { ProductForm } from './ProductForm';
import { ApiError } from '../../../../models/ApiError';
import { api } from 'api/api';
import { forwardRef } from 'react';

interface ProductCreateFormProps {
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

export const ProductCreateForm = forwardRef<
    HTMLFormElement,
    ProductCreateFormProps
>((props, ref) => {
    const { mutate: createProduct } = useCreateProduct(props.onSave);

    const handleSave = async (values: ProductFormDto, images?: File[]) => {
        if (!images || images.length === 0) return;

        const formData = new FormData();

        images.forEach((image) => {
            formData.append(`images`, new Blob([image]), image.name);
        });

        const productData = JSON.stringify(values);
        formData.append('product', productData);

        await createProduct(formData);
    };

    return <ProductForm ref={ref} {...props} onSave={handleSave} />;
});

ProductCreateForm.displayName = 'ProductCreateForm';
