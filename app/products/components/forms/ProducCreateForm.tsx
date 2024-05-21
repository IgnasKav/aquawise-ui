'use client';

import { AlertDto } from '../../../shared/components/alert/models/AlertDto';
import useAlert from '../../../shared/stores/useAlert';
import { ProductForm, ProductFormDto } from './ProductForm';
import { api } from 'api/api';
import { forwardRef } from 'react';
import { Subject } from 'rxjs';
import { Product } from 'app/products/models/Product';

type ProductCreateFormProps = {
    id: string;
    onCloseSubject: Subject<void>;
    onSubmitSubject: Subject<void>;
};

export const ProductCreateForm = forwardRef<
    HTMLFormElement,
    ProductCreateFormProps
>((props, ref) => {
    const [createAlert, createAlertFromApiError] = useAlert((state) => [
        state.createAlert,
        state.createAlertFromApiError,
    ]);

    const handleSave = async (values: ProductFormDto) => {
        const resp = await api.Products.create(values);

        if (resp.isError) {
            createAlertFromApiError(resp);
        } else {
            const alert = new AlertDto({
                message: 'Product created',
                type: 'success',
                title: 'Success!',
            });

            createAlert(alert);
        }
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
