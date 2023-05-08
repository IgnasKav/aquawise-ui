import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Group, Text } from '@mantine/core';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons';

const ImageSelector = (props: Partial<DropzoneProps>) => {
    return (
        <Dropzone
            onDrop={(files) => console.log('accepted files', files)}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            {...props}
        >
            <Group
                position="center"
                spacing="xl"
                style={{ minHeight: 150, pointerEvents: 'none' }}
            >
                <Dropzone.Accept>
                    <IconUpload size="3.2rem" stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <IconX size="3.2rem" stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                    <IconPhoto size="3.2rem" stroke={1.5} />
                </Dropzone.Idle>

                <div>
                    <Text size="xl" inline>
                        Drag images here or click to select files
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not
                        exceed 5mb
                    </Text>
                </div>
            </Group>
        </Dropzone>
    );
};

export default ImageSelector;
