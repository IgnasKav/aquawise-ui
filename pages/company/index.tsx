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
import { DropZoneComponent } from '../../app/shared/components/dropzone/DropZone';
import useAuth from '../../stores/useAuth';
import { api } from '../../api/api';
import {
    ThemeColor,
    ThemeColors,
} from '../../components/common/theme/ThemeColors';

const CompanyEditForm = () => {
    const [user, isLoading, getCurrent] = useAuth((state) => [
        state.user,
        state.isLoading,
        state.getCurrent,
    ]);
    const [image, setImage] = useState<File | null>(null);
    const [themeColor, setThemeColor] = useState<ThemeColor | null>();

    useEffect(() => {
        const hex = user?.company?.brandColor;

        if (!hex) return;

        const name = ThemeColors.getByHex(hex);

        if (!name) return;

        setThemeColor({
            name: name,
            hex: hex,
        });
    }, [user]);

    const handleDrop = (image: File) => {
        setImage(image);
    };

    const handleSave = async () => {
        const formData = new FormData();
        if (image) {
            formData.append('image', new Blob([image]), image.name);
        }

        if (themeColor) {
            formData.append('color', themeColor.hex);
        }

        if (user != null) {
            await api.Companies.saveColor(user.company.id, themeColor?.hex);
            getCurrent();
        }

        // if (isCreateForm) {
        //     createProduct(formData);
        // } else {
        //     console.log('id', product.id);
        //     editProduct({ productId: product.id, product: formData });
        // }
    };

    const handleColorSelect = (hex: string) => {
        const name = ThemeColors.getByHex(hex);

        if (!name) return;

        setThemeColor({
            name: name,
            hex: hex,
        });
    };

    const handleCancel = () => {
        setThemeColor(null);
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
                            value={
                                themeColor?.hex ?? ThemeColors.getByName('blue')
                            }
                            onChange={handleColorSelect}
                            disallowInput
                            withPicker={false}
                            swatches={ThemeColors.getAll().map(
                                (color) => color.hex,
                            )}
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
