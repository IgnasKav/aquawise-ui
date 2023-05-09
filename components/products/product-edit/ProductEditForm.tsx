import { Product } from '../models/Product';
import { useForm, UseFormReturnType } from '@mantine/form';
import { CreateProductRequestDto } from '../models/CreateProductRequest.dto';
import {
    Button,
    Group,
    Image,
    NumberInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { TbPhoto, TbUpload, TbX } from 'react-icons/tb';
import css from './dropzone.module.scss';
import { useState } from 'react';

interface Props {
    product: Product;
}

export const ProductEditForm = ({ product }: Props) => {
    const [imageUrl, setIamgeUrl] = useState<string | null>(null);
    const form: UseFormReturnType<CreateProductRequestDto> = useForm({
        initialValues: new CreateProductRequestDto(product),
        validate: {
            quantity: (val: number) =>
                val >= 0 ? null : 'Quantity can not be lower than 0',
            price: (val: number) =>
                val >= 0 ? null : 'Price can not be lower than 0',
        },
    });

    const onDrop = (files: File[]) => {
        const imagePreview = URL.createObjectURL(files[0]);
        setIamgeUrl(imagePreview);
        // setImage(files[0]);
        // setAdvertisement({ ...advertisement, imageUrl: imagePreview });
    };

    // onSubmit={form.onSubmit(() => mutate(form.values))}
    return (
        <form>
            {/*<LoadingOverlay visible={isLoading} overlayBlur={0.5} />*/}
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
                    {...form.getInputProps('quantity')}
                />
                <NumberInput
                    placeholder="Price"
                    label="Price"
                    withAsterisk
                    {...form.getInputProps('price')}
                />
                <Dropzone
                    className={css.dropzone}
                    mt={20}
                    maxSize={3 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                    onDrop={(files) => onDrop(files)}
                    onReject={(files) => console.log('rejected files', files)}
                >
                    {imageUrl && (
                        <Image
                            className={css.imageBackground}
                            key={imageUrl}
                            src={imageUrl}
                            height={296}
                            imageProps={{
                                onLoad: () => URL.revokeObjectURL(imageUrl),
                            }}
                        />
                    )}
                    <Group
                        position="center"
                        spacing="xl"
                        style={{ minHeight: 220, pointerEvents: 'none' }}
                    >
                        <Dropzone.Accept>
                            <TbUpload className={css.iconAccepted} size={80} />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <TbX className={css.iconRejected} size={80} />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <TbPhoto size={80} className={css.iconIdle} />
                        </Dropzone.Idle>
                        <div>
                            <Text size="xl" inline>
                                Drag images here or click to select files
                            </Text>
                            <Text size="sm" color="dimmed" inline mt={7}>
                                Attach as many files as you like, each file
                                should not exceed 5mb
                            </Text>
                        </div>
                    </Group>
                </Dropzone>
                <Button w={140} type="submit" radius="xl">
                    Create Product
                </Button>
            </Stack>
        </form>
    );
};
