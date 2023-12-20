'use client';

import { Button, Modal, Space } from '@mantine/core';
import { useState } from 'react';
import { ProductCreateForm } from './forms/ProducCreateForm';

export const CreateProductButton = () => {
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
                <ProductCreateForm onSave={() => setIsOpened(false)} />
            </Modal>
        </>
    );
};
