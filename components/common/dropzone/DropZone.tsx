import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Group, Image, Text } from '@mantine/core';
import { TbPhoto, TbUpload, TbX } from 'react-icons/tb';
import { useState } from 'react';

import css from './dropzone.module.scss';

interface Props {
    onDrop: (image: File, imageUrl?: string) => void;
    imageUrl?: string;
}

export const DropZoneComponent = ({
    onDrop,
    imageUrl: initialImageUrl,
}: Props) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(
        initialImageUrl,
    );

    const handleDrop = (files: File[]) => {
        const imagePreview = URL.createObjectURL(files[0]);

        onDrop(files[0], imagePreview);
        setImageUrl(imagePreview);
    };

    return (
        <>
            <Dropzone
                className={css.dropzone}
                mt={20}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                onDrop={(files) => handleDrop(files)}
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
                            Attach as many files as you like, each file should
                            not exceed 5mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>
        </>
    );
};
