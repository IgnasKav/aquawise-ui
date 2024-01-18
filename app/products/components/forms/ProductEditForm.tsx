'use client';

import { Product } from '../../models/Product';
import { api } from '../../../../api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertDto } from '../../../../components/alert/models/AlertDto';
import useAlert from '../../../../stores/useAlert';
import { ProductForm, ProductFormDto } from './ProductForm';
import { ApiError } from '../../../../api/models/ApiError';
import { forwardRef } from 'react';
import { Subject } from 'rxjs';

interface ProductUpdateMutation {
    productId: string;
    product: ProductFormDto;
}

const useProductEdit = (onSave?: () => void) => {
    const queryClient = useQueryClient();
    const [createAlert] = useAlert((state) => [state.createAlert]);

    const mutation = useMutation({
        mutationFn: ({ productId, product }: ProductUpdateMutation) =>
            api.Products.update(productId, product),
        onSuccess: async () => {
            const alert = new AlertDto({
                message: 'Product edited',
                type: 'success',
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

type ProductEditFormProps = {
    id: string;
    product: Product;
    onSave?: () => void;
    onCloseSubject: Subject<void>;
    onSubmitSubject: Subject<void>;
};

export const ProductEditForm = forwardRef<
    HTMLFormElement,
    ProductEditFormProps
>(({ id, product, onSave, onCloseSubject, onSubmitSubject }, ref) => {
    const { mutate: editProduct } = useProductEdit(onSave);

    // change
    const handleSave = async (values: ProductFormDto) => {
        editProduct({ productId: product.id, product: values });
    };

    return (
        <ProductForm
            id={id}
            product={product}
            onSave={handleSave}
            onCloseSubject={onCloseSubject}
            onSubmitSubject={onSubmitSubject}
            ref={ref}
        ></ProductForm>
    );
});

ProductEditForm.displayName = 'ProductEditForm';
