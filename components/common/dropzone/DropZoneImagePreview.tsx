'use client';

import Image from 'next/image';
import { ImagePreview } from './models/ImagePreview';
import { Dispatch, SetStateAction } from 'react';

type DropZoneImagePreviewProps = {
    images: ImagePreview[];
    setImages: Dispatch<SetStateAction<ImagePreview[]>>;
};

type ImagePreviewProps = {
    previewUrl: string;
    onRemove: (previewUrl: string) => void;
};

const ImagePreview = ({ previewUrl, onRemove }: ImagePreviewProps) => {
    const handleRemove = () => {
        onRemove(previewUrl);
    };

    return (
        <div className="relative w-fit">
            <Image
                className="border rounded"
                src={previewUrl}
                width={100}
                height={100}
                alt="Product image"
                onLoad={() => URL.revokeObjectURL(previewUrl)}
            />
            <div
                onClick={handleRemove}
                className="absolute top-[-3px] right-[-3px] h-[15px] w-[15px] cursor-pointer flex justify-center items-center"
            >
                <div className="absolute rounded-full h-full w-full bg-red-600 hover:bg-red-700"></div>
                <div className="h-[2px] w-[8px] bg-white z-10"></div>
            </div>
        </div>
    );
};

const DropZoneImagePreview = ({
    images,
    setImages,
}: DropZoneImagePreviewProps) => {
    const onRemove = (previewUrl: string) => {
        setImages((oldImages) =>
            oldImages.filter((image) => image.previewUrl !== previewUrl),
        );
    };

    return (
        <div className="flex gap-2">
            {images.map((image) => (
                <ImagePreview
                    key={image.previewUrl}
                    previewUrl={image.previewUrl}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
};

export { DropZoneImagePreview };
