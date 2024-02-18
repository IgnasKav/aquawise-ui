'use client';
import useImages from 'stores/useImages';
import { ImageDto } from 'api/images/models/ImageEntity';
import Image from 'next/image';
import { ApiUrl, api } from 'api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CloseButton from '../icons/CloseIcon';

type ImagePreviewProps = {
    image: ImageDto;
};

const ImagePreview = ({ image }: ImagePreviewProps) => {
    const queryClient = useQueryClient();

    const [images, setImages] = useImages((state) => [
        state.images,
        state.setImages,
    ]);

    const { mutate: deleteImages } = useMutation({
        mutationFn: api.Images.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
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
            <CloseButton
                onClick={() => deleteImages({ images: [image] })}
                className="absolute top-[-3px] right-[-3px]"
                color="red"
            />
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
