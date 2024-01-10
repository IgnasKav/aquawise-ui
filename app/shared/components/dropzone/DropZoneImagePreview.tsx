'use client';
import { XCircle } from 'lucide-react';
import useImages from 'stores/useImages';
import { ImageDto } from 'api/images/models/ImageEntity';
import Image from 'next/image';
import { ApiUrl, api } from 'api/api';
import { useMutation } from '@tanstack/react-query';

type ImagePreviewProps = {
    image: ImageDto;
};

const ImagePreview = ({ image }: ImagePreviewProps) => {
    const [images, setImages] = useImages((state) => [
        state.images,
        state.setImages,
    ]);

    const { mutate: deleteImages } = useMutation({
        mutationFn: api.Images.delete,
        onSuccess: () => {
            const filteredImages = images.filter((x) => x.id !== image.id);
            setImages(filteredImages);
        },
    });

    return (
        <div className="relative w-[90px]">
            <Image
                className="border rounded"
                src={`${ApiUrl}/${image.imageUrl}`}
                width={100}
                height={100}
                alt="Product image"
                onLoad={() => URL.revokeObjectURL(image.imageUrl)}
            />
            <div
                onClick={() => deleteImages({ images: [image] })}
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

const DropZoneImagePreview = () => {
    const [images] = useImages((state) => [state.images]);

    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {images.map((image) => (
                <ImagePreview key={image.id} image={image} />
            ))}
        </div>
    );
};

export { DropZoneImagePreview };
