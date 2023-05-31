import { Product } from '../models/Product';
import { Card, Group, Image, Text } from '@mantine/core';
import css from './product-list.module.scss';
import { modals } from '@mantine/modals';
import { ProductEditForm } from '../product-edit/ProductEditForm';
import { ApiUrl } from '../../../api/api';

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    const openEditModal = () =>
        modals.open({
            id: 'productEditModal',
            title: 'Edit product',
            children: (
                <ProductEditForm
                    isCreateForm={false}
                    product={product}
                    onSave={() => modals.close('productEditModal')}
                />
            ),
        });

    return (
        <Card className={css.card} withBorder onClick={() => openEditModal()}>
            <Card.Section>
                <div className={css.imageContainer}>
                    <Image
                        className={css.image}
                        src={`${ApiUrl}/${product.imageUrl}`}
                        height={180}
                        withPlaceholder
                    />
                </div>
            </Card.Section>
            <Card.Section className={css.section}>
                <Text className={css.title} lineClamp={1}>
                    {product.name}
                </Text>
                <Text className={css.description} lineClamp={2}>
                    Random
                </Text>
            </Card.Section>
            <Group className={css.priceSection}>
                <Text className={css.price}>€{product.price}</Text>
            </Group>
        </Card>
    );
};
