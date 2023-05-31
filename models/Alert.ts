import {v4 as uuid} from 'uuid';

export class Alert {
    id: string;
    type: AlertType
    message: string;
    title: string;

    constructor(alert: Partial<Alert>) {
        this.id = alert?.id ?? uuid();
        this.type = alert?.type ?? AlertType.info;
        this.message = alert?.message ?? '';
        this.title = alert?.title ?? '';
    }
}
export enum AlertType {
    'error',
    'success',
    'info'
}
