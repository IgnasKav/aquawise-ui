import { create } from 'zustand';
import { produce } from 'immer';

interface ImageState {
    images: string[];
    setImages: (images: string[]) => void;
}

const useImages = create<ImageState>((set) => ({
    images: [],
    setImages: (images: string[]) =>
        set(
            produce((state: ImageState) => {
                state.images = images;
            }),
        ),
}));

export default useImages;
