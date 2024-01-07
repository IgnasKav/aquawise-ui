'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageFile } from './models/ImageFile';
import { DropZoneImagePreview } from './DropZoneImagePreview';
import { api } from 'api/api';
import useImages from 'stores/useImages';

type DropZoneProps = {
    title: string;
    onChange: (images: ImageFile[]) => void;
};

// file size cannot be determined on drop
const DropZone = ({ title, onChange }: DropZoneProps) => {
    const [images, setImages] = useState<ImageFile[]>([]);

    const [savedImages, setSavedImages] = useImages((state) => [
        state.images,
        state.setImages,
    ]);

    useEffect(() => {
        onChange(images);
    }, [images, onChange]);

    const saveImage = async (image: ImageFile) => {
        const formData = new FormData();
        formData.append(`image`, new Blob([image]), image.name);
        const res = await api.Images.save(formData);

        setSavedImages([...savedImages, res.imageUrl]);
    };

    const handleDrop = async (acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) =>
            Object.assign(file, { previewUrl: URL.createObjectURL(file) }),
        );

        for (const file of newFiles) {
            await saveImage(file);
        }

        setImages([...images, ...newFiles]);
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
        <>
            <div
                {...getRootProps()}
                className={cn(
                    'relative flex items-center justify-center h-12 w-full border rounded-md mb-3',
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
            <DropZoneImagePreview newImages={images} setImages={setImages} />
        </>
    );
};

export { DropZone };
