'use client';

import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePreview } from './models/ImagePreview';
import { DropZoneImagePreview } from './DropZoneImagePreview';

type DropZoneProps = {
    title: string;
};

// file size cannot be determined on drop
const DropZone = ({ title }: DropZoneProps) => {
    const [images, setImages] = useState<ImagePreview[]>([]);

    useEffect(() => {
        console.log('files', images);
    }, [images]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) =>
            Object.assign(file, { previewUrl: URL.createObjectURL(file) }),
        );

        console.log('new files', newFiles);

        setImages((oldFiles) => [...oldFiles, ...newFiles]);
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isFocused,
        isDragReject,
        isDragAccept,
    } = useDropzone({
        onDrop,
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
                    'relative flex items-center justify-center h-12 w-full border rounded-md',
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
            <DropZoneImagePreview images={images} setImages={setImages} />
        </>
    );
};

export { DropZone };
