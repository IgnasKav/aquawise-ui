import { requests } from 'api/api';
import { ImageDeleteRequest } from './models/ImageDeleteRequest';
import { ImageSaveResponse } from './models/ImageSaveResponse';

const ImagesApi = {
    save: (req: FormData): Promise<ImageSaveResponse> =>
        requests.post('/images', req, true),
    delete: (req: ImageDeleteRequest): Promise<void> =>
        requests.post('/images/delete', req),
};

export { ImagesApi };
