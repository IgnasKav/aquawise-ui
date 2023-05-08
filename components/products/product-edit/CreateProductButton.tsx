import { Button } from '@mantine/core';
import { Product } from '../models/Product';
import { ProductEditDialog } from './ProductEditDialog';
import { useState } from 'react';

export const CreateProductButton = () => {
    const [newProduct] = useState<Product>(new Product());
    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <>
            <Button onClick={() => setIsOpened(true)}>Add product</Button>
            <ProductEditDialog
                product={newProduct}
                isNew={true}
                isOpened={isOpened}
                onClose={() => setIsOpened(false)}
            />
        </>
    );
};
