'use client';

import Image from 'next/image';
import { ImageFile } from './models/ImageFile';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { XCircle } from 'lucide-react';
import useImages from 'stores/useImages';

type ImagePreviewProps = {
    previewUrl: string;
    onRemove: (previewUrl: string) => void;
};

const ImagePreview = ({ previewUrl, onRemove }: ImagePreviewProps) => {
    const handleRemove = () => {
        onRemove(previewUrl);
    };

    return (
        <div className="relative w-[90px]">
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
                className="absolute top-[-3px] right-[-3px] h-[24px] w-[24px] cursor-pointer"
            >
                <div className="absolute left-[2px] top-[2px] rounded-full h-[20px] w-[20px] bg-background"></div>
                <XCircle
                    className="absolute stroke-red-600 hover:stroke-red-700"
                    size={24}
                    strokeWidth={2}
                />
            </div>
        </div>
    );
};

type DropZoneImagePreviewProps = {
    newImages: ImageFile[];
    setImages: Dispatch<SetStateAction<ImageFile[]>>;
};

const DropZoneImagePreview = ({
    newImages,
    setImages,
}: DropZoneImagePreviewProps) => {
    const [previews, setPreviews] = useState<string[]>([]);
    const [savedImages] = useImages((state) => [state.images]);

    useEffect(() => {
        console.log('preview', savedImages);
        const newImageUrls = newImages.map((image) => image.previewUrl);

        setPreviews([...savedImages, ...newImageUrls]);
    }, [savedImages, newImages]);

    const handleRemove = (previewUrl: string) => {
        setImages((oldImages) =>
            oldImages.filter((image) => image.previewUrl !== previewUrl),
        );
    };

    return (
        <div className="flex flex-wrap gap-2">
            {previews.map((preview) => (
                <ImagePreview
                    key={preview}
                    previewUrl={preview}
                    onRemove={handleRemove}
                />
            ))}
        </div>
    );
};

export { DropZoneImagePreview };
