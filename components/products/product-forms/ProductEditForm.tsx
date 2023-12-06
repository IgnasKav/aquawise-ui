import { Product } from '../models/Product';
import { ProductFormDto } from '../models/ProductForm.dto';
import { Button } from '@mantine/core';
import { api, parseError } from '../../../api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert, AlertType } from '../../../models/Alert';
import useAlert from '../../../stores/useAlert';
import { AxiosError } from 'axios';
import { ProductQueryKeys } from '../models/ProductQueryKeys';
import { ProductForm } from './ProductForm';

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

interface Props {
    product: Product;
    onSave?: () => void;
}

export const ProductEditForm = (props: Props) => {
    const { mutate: editProduct } = useProductEdit(props.onSave);

    const handleSave = async (values: ProductFormDto, image?: File) => {
        const formData = new FormData();
        if (image) {
            formData.append('image', new Blob([image]), image.name);
        }

        const productData = JSON.stringify(values);
        formData.append('product', productData);

        editProduct({ productId: props.product.id, product: formData });
    };

    return (
        <ProductForm {...props} onSave={handleSave}>
            <Button w={140} type="submit" radius="xl">
                Edit Product
            </Button>
        </ProductForm>
    );
};
