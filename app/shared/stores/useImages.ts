import { create } from 'zustand';
import { produce } from 'immer';
import { ImageDto } from 'api/images/models/ImageEntity';

interface ImageState {
    images: ImageDto[];
    setImages: (images: ImageDto[]) => void;
}

const useImages = create<ImageState>((set) => ({
    images: [],
    setImages: (images: ImageDto[]) =>
        set(
            produce((state: ImageState) => {
                state.images = images;
            }),
        ),
}));

export default useImages;
