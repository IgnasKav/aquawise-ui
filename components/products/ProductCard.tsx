import { Product } from './models/Product';
import { Card, Group, Image, Text } from '@mantine/core';
import css from './products.module.scss';

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    return (
        <Card className={css.card} withBorder>
            <Card.Section>
                <div className={css.imageContainer}>
                    <Image
                        className={css.image}
                        src={product.imageUrl}
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
