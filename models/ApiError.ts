import { Alert, AlertType } from './Alert';

export class ApiError {
    error: string;
    message: string;
    statusCode: number;
    timeStamp: string;

    constructor(error?: Partial<ApiError>) {
        this.error = error?.error ?? '';
        this.message = error?.message ?? '';
        this.statusCode = error?.statusCode ?? 0;
        this.timeStamp = error?.timeStamp ?? '';
    }

    toAlert(): Alert {
        return new Alert({
            type: AlertType.error,
            title: 'Error',
            message: this.message,
        });
    }
}
