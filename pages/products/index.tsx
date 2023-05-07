import { Product } from '../../components/products/models/Product';
import { createFakeProduct } from '../../components/products/models/FakeProduct';
import { Card, createStyles, Group, Image, Text } from '@mantine/core';
import { RequireAuth } from '../../components/auth/RequireAuth';

const useStyles = createStyles((theme, _params, getRef) => {
    const image = getRef('image');

    return {
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gridGap: '1rem',
        },
        card: {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.white,
            width: 260,
            height: 344,
            cursor: 'pointer',
            margin: '0 auto',

            [`&:hover .${image}`]: {
                transform: 'scale(1.03)',
            },
        },

        section: {
            borderBottom: `1px solid ${
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[4]
                    : theme.colors.gray[3]
            }`,
            paddingLeft: theme.spacing.md,
            paddingRight: theme.spacing.md,
            paddingBottom: theme.spacing.md,
        },

        selected: {
            border: '2px solid #248ae6;',

            [`.${image}`]: {
                transform: 'scale(1.03)',
            },
        },

        imageContainer: {
            height: 180,
            position: 'relative',
        },

        image: {
            ref: image,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transition: 'transform 500ms ease',
        },

        description: {
            height: 44,
        },

        nameGroup: {
            overflow: 'hidden',
        },

        like: {
            color: theme.colors.red[6],
        },

        label: {
            textTransform: 'uppercase',
            fontSize: theme.fontSizes.xs,
            fontWeight: 700,
        },
    };
});

// this will be removed after implementing product fetching
export async function getServerSideProps() {
    const fakeProducts: Product[] = [];

    for (let i = 0; i < 10; i++) {
        fakeProducts.push(createFakeProduct());
    }
    const products = JSON.parse(JSON.stringify(fakeProducts));

    return {
        props: {
            products: products,
        },
    };
}

interface ServerSideProps {
    products?: Product[];
}

const ProductsPage = ({ products }: ServerSideProps) => {
    const { classes } = useStyles();

    return (
        <RequireAuth>
            <div id="grid" className={classes.grid}>
                {products?.map((product) => (
                    <Card
                        shadow="md"
                        withBorder
                        radius="md"
                        key={product.id}
                        className={classes.card}
                    >
                        <Card.Section>
                            <div className={classes.imageContainer}>
                                <Image
                                    className={classes.image}
                                    src={product.imageUrl}
                                    height={180}
                                    withPlaceholder
                                />
                            </div>
                        </Card.Section>
                        <Card.Section className={classes.section} mt="md">
                            <Text size="lg" weight={500} lineClamp={1}>
                                {product.name}
                            </Text>
                            <Text
                                size="sm"
                                mt="5px"
                                className={classes.description}
                                color="dimmed"
                                lineClamp={2}
                            >
                                Random
                            </Text>
                        </Card.Section>
                        <Group spacing={30} mt="md">
                            <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                                €{product.price}
                            </Text>
                        </Group>
                    </Card>
                ))}
            </div>
        </RequireAuth>
    );
};

export default ProductsPage;
