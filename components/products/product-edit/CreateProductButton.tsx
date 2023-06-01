import { Button, Modal, Space } from '@mantine/core';
import { Product } from '../models/Product';
import { ProductEditForm } from './ProductEditForm';
import { useState } from 'react';

export const CreateProductButton = () => {
    const [newProduct] = useState<Product>(new Product());
    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <>
            <Button onClick={() => setIsOpened(true)}>Add product</Button>
            <Space></Space>
            <Modal
                opened={isOpened}
                onClose={() => setIsOpened(false)}
                title="Create new product"
            >
                <ProductEditForm
                    isCreateForm={true}
                    product={newProduct}
                    onSave={() => setIsOpened(false)}
                />
            </Modal>
        </>
    );
};
