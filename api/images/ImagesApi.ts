import { requests } from 'api/api';
import { ImageDeleteRequest } from './models/ImageDeleteRequest';
import { ImageSaveResponse } from './models/ImageSaveResponse';

const prefix = '/images';

const ImagesApi = {
    save: (req: FormData): Promise<ImageSaveResponse> =>
        requests.post(`${prefix}`, req, true),
    delete: (req: ImageDeleteRequest): Promise<void> =>
        requests.post(`${prefix}/delete`, req),
};

export { ImagesApi };
