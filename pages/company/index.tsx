import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    ColorInput,
    Container,
    Group,
    Loader,
    Stack,
    Text,
} from '@mantine/core';
import { DropZoneComponent } from '../../components/common/dropzone/DropZone';
import useAuth from '../../stores/useAuth';
import { api } from '../../api/api';

const CompanyEditForm = () => {
    const [user, isLoading, getCurrent] = useAuth((state) => [
        state.user,
        state.isLoading,
        state.getCurrent,
    ]);
    const [image, setImage] = useState<File | null>(null);
    const [color, setColor] = useState<string | null>(null);

    useEffect(() => {
        setColor(user?.company.brandColor ?? null);
    }, [user]);

    const handleDrop = (image: File) => {
        setImage(image);
    };

    const handleSave = async () => {
        const formData = new FormData();
        if (image) {
            formData.append('image', new Blob([image]), image.name);
        }

        if (color) {
            formData.append('color', color);
        }

        if (user != null) {
            await api.Companies.saveColor(user.company.id, color);
            getCurrent();
        }

        // if (isCreateForm) {
        //     createProduct(formData);
        // } else {
        //     console.log('id', product.id);
        //     editProduct({ productId: product.id, product: formData });
        // }
    };

    const handleCancel = () => {
        setColor(null);
        setImage(null);
    };

    return (
        <Card shadow="md" px={50} radius="lg" p="md" withBorder>
            {isLoading ? (
                <Loader />
            ) : (
                <Stack>
                    <Text fw={700} fz={42}>
                        {user?.company.name}
                    </Text>
                    <Text>Code: {user?.company.code}</Text>
                    <Text fw={700} fz={24}>
                        Contacts
                    </Text>
                    <Text>Email: {user?.company.email}</Text>
                    <Text>Phone: {user?.company.phone}</Text>
                    <Container px={0} mx={0} w={350}>
                        <Stack spacing={0}>
                            <Text>Company logo</Text>
                            <DropZoneComponent
                                onDrop={handleDrop}
                                imageUrl={user?.company.logoUrl}
                            />
                        </Stack>
                    </Container>
                    <Stack w={350}>
                        <ColorInput
                            label="Primary color"
                            format="hex"
                            value={color ?? '#228be6'}
                            onChange={setColor}
                            swatches={[
                                '#25262b',
                                '#868e96',
                                '#fa5252',
                                '#e64980',
                                '#be4bdb',
                                '#7950f2',
                                '#4c6ef5',
                                '#228be6',
                                '#15aabf',
                                '#12b886',
                                '#40c057',
                                '#82c91e',
                                '#fab005',
                                '#fd7e14',
                            ]}
                        />
                        <Text>
                            Primary color will change the way Aquawise mobile
                            app looks for you clients as well!
                        </Text>
                    </Stack>
                    <Group>
                        <Button
                            w={140}
                            type="submit"
                            radius="xl"
                            onClick={handleSave}
                        >
                            {'Save'}
                        </Button>
                        <Button
                            w={140}
                            color="gray"
                            type="submit"
                            radius="xl"
                            onClick={handleCancel}
                        >
                            {'Cancel'}
                        </Button>
                    </Group>
                </Stack>
            )}
        </Card>
    );
};

export default CompanyEditForm;
