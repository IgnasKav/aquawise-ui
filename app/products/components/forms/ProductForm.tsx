import { Stack, TextInput, NumberInput } from '@mantine/core';
import { useState } from 'react';
import { ApiUrl } from '../../../../api/api';
import { DropZoneComponent } from '../../../../components/common/dropzone/DropZone';
import { Product } from '../../models/Product';
import { ProductFormDto } from '../../models/ProductForm.dto';
import { UseFormReturnType, useForm } from '@mantine/form';

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

interface ProductFormProps {
    product: Product;
    onSave: (formValues: ProductFormDto, image?: File) => void;
    children: React.ReactNode;
}

export const ProductForm = ({
    product,
    onSave,
    children,
}: ProductFormProps) => {
    const [image, setImage] = useState<File | undefined>(undefined);

    const form = useProductForm(product);

    const handleDrop = (image: File) => {
        setImage(image);
    };

    return (
        <form onSubmit={form.onSubmit(() => onSave(form.values, image))}>
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
                    imageUrl={
                        product.imageUrl && `${ApiUrl}/${product.imageUrl}`
                    }
                />
                {children}
            </Stack>
        </form>
    );
};
