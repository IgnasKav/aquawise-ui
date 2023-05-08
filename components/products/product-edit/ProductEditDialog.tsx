import { Modal } from '@mantine/core';
import { Product } from '../models/Product';

interface Props {
    product: Product;
    isNew: boolean;
    isOpened: boolean;
    onClose: () => void;
}

export const ProductEditDialog = ({
    product,
    isNew,
    isOpened,
    onClose,
}: Props) => {
    return (
        <Modal
            opened={isOpened}
            onClose={onClose}
            title={isNew ? 'Create new product' : 'Edit product'}
        >
            <div>Product edit dialog</div>
        </Modal>
    );
};
