'use client';

import { Product } from '../../models/Product';
import { api } from '../../../../api/api';
import { AlertDto } from '../../../shared/components/alert/models/AlertDto';
import useAlert from '../../../shared/stores/useAlert';
import { ProductForm, ProductFormDto } from './ProductForm';
import { forwardRef } from 'react';
import { Subject } from 'rxjs';

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
    const [createAlert, createAlertFromApiError] = useAlert((state) => [
        state.createAlert,
        state.createAlertFromApiError,
    ]);

    const handleSave = async (values: ProductFormDto) => {
        const resp = await api.Products.update(product.id, values);

        if (resp.isError) {
            createAlertFromApiError(resp);
            return;
        }

        if (onSave) {
            onSave();
        }

        const alert = new AlertDto({
            message: 'Product edited',
            type: 'success',
            title: 'Success!',
        });

        createAlert(alert);
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
