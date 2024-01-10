'use client';

import { cn } from '@/lib/utils';
import { useDropzone } from 'react-dropzone';
import { ImageFile } from './models/ImageFile';
import { DropZoneImagePreview } from './DropZoneImagePreview';
import { api } from 'api/api';
import useImages from 'stores/useImages';
import { Control, useController } from 'react-hook-form';

type DropZoneProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    title: string;
    error?: string;
};

// file size cannot be determined on drop
const DropZone = ({ control, name, title, error }: DropZoneProps) => {
    const { field } = useController({
        name,
        control,
    });

    const [images, setSavedImages] = useImages((state) => [
        state.images,
        state.setImages,
    ]);

    const saveImages = async (newImages: ImageFile[]) => {
        const formData = new FormData();

        newImages.forEach((image) => {
            formData.append(`images`, new Blob([image]), image.name);
        });

        const res = await api.Images.save(formData);

        const savedImages = [...images, ...res];

        console.log('setting saved images', savedImages);

        setSavedImages(savedImages);
        field.onChange(savedImages);
    };

    const handleDrop = async (acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) =>
            Object.assign(file, { previewUrl: URL.createObjectURL(file) }),
        );

        await saveImages(newFiles);
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isFocused,
        isDragReject,
        isDragAccept,
    } = useDropzone({
        onDrop: handleDrop,
        maxFiles: 5,
        maxSize: 1000000,
        accept: {
            'image/*': ['.jpeg', '.png'],
        },
    });

    return (
        <div>
            <div
                {...getRootProps()}
                className={cn(
                    'relative flex items-center justify-center h-12 w-full border rounded-md mb-[3px]',
                    { 'ring-1 ring-ring': isDragActive || isFocused },
                    { 'ring-1 ring-red-500': isDragReject },
                    { 'ring-1 ring-green-500': isDragAccept },
                )}
            >
                <div className="">
                    {isDragReject
                        ? 'File should be a jpeg/png image under 1mb'
                        : title}
                </div>
                <input
                    className="absolute h-full w-full"
                    {...getInputProps()}
                />
            </div>
            {error && <div className="text-xs text-red-500">{error}</div>}
            <DropZoneImagePreview />
        </div>
    );
};

export { DropZone };
