import { requests } from 'api/api';
import { ImageDeleteRequest } from './models/ImageDeleteRequest';
import { ImageSaveResponse } from './models/ImageSaveResponse';

const prefix = '/images';

const ImagesApi = {
    save: (req: FormData) =>
        requests.post<ImageSaveResponse>(`${prefix}`, req, true),
    delete: (req: ImageDeleteRequest) =>
        requests.post<void>(`${prefix}/delete`, req),
};

export { ImagesApi };
