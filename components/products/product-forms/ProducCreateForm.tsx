import { Button } from '@mantine/core';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api, parseError } from '../../../api/api';
import { Alert, AlertType } from '../../../models/Alert';
import useAlert from '../../../stores/useAlert';
import { Product } from '../models/Product';
import { ProductFormDto } from '../models/ProductForm.dto';
import { ProductQueryKeys } from '../models/ProductQueryKeys';
import { ProductForm } from './ProductForm';

interface Props {
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
