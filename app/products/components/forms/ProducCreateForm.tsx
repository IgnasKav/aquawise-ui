'use client';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AlertDto } from '../../../shared/components/alert/models/AlertDto';
import useAlert from '../../../shared/stores/useAlert';
import { ProductForm, ProductFormDto } from './ProductForm';
import { ApiError } from '../../../../api/models/ApiError';
import { api } from 'api/api';
import { forwardRef } from 'react';
import { Subject } from 'rxjs';
import { Product } from 'app/products/models/Product';

const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const [createAlert, createAlertFromApiError] = useAlert((state) => [
        state.createAlert,
        state.createAlertFromApiError,
    ]);

    const mutation = useMutation({
        mutationFn: api.Products.create,
        onSuccess: async () => {
            const alert = new AlertDto({
                message: 'Product created',
                type: 'success',
                title: 'Success!',
            });

            createAlert(alert);
            await queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error: ApiError) => {
            createAlertFromApiError(error);
        },
    });

    return mutation;
};

type ProductCreateFormProps = {
    id: string;
    onCloseSubject: Subject<void>;
    onSubmitSubject: Subject<void>;
};

export const ProductCreateForm = forwardRef<
    HTMLFormElement,
    ProductCreateFormProps
>((props, ref) => {
    const { mutate: createProduct } = useCreateProduct();

    const handleSave = async (values: ProductFormDto) => {
        await createProduct(values);
    };

    const product: Product = {
        id: '',
        name: '',
        quantity: 1,
        price: 0,
        images: [],
    };

    return (
        <ProductForm
            product={product}
            ref={ref}
            {...props}
            onSave={handleSave}
        />
    );
});

ProductCreateForm.displayName = 'ProductCreateForm';
