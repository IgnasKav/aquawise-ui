'use client';

import { Product } from '../../models/Product';
import { ProductFormDto } from '../../models/ProductForm.dto';
import { api } from '../../../../api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert, AlertType } from '../../../../models/Alert';
import useAlert from '../../../../stores/useAlert';
import { ProductForm } from './ProductForm';
import { ApiError } from '../../../../models/ApiError';

interface ProductUpdateMutation {
    productId: string;
    product: FormData;
}

const useProductEdit = (onSave?: () => void) => {
    // const queryClient = useQueryClient();
    const [createAlert] = useAlert((state) => [state.createAlert]);

    const mutation = useMutation({
        mutationFn: ({ productId, product }: ProductUpdateMutation) =>
            api.Products.update(productId, product),
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
            // await queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error: ApiError) => {
            createAlert(error.toAlert());
        },
    });

    return mutation;
};

interface ProductEditFormProps {
    product: Product;
    onSave?: () => void;
}

export const ProductEditForm = ({ product, onSave }: ProductEditFormProps) => {
    const { mutate: editProduct } = useProductEdit(onSave);

    const handleSave = async (values: ProductFormDto, images?: File[]) => {
        if (!images) return;

        const image = images[0];

        if (!image) return;

        const formData = new FormData();
        formData.append('image', new Blob([image]), image.name);

        const productData = JSON.stringify(values);
        formData.append('product', productData);

        editProduct({ productId: product.id, product: formData });
    };

    return <ProductForm product={product} onSave={handleSave}></ProductForm>;
};
