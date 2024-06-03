import { v4 as uuid } from 'uuid';

export class AlertDto {
    id: string;
    type: 'error' | 'success' | 'info';
    message: string;
    title: string;

    constructor(alert: Partial<AlertDto>) {
        this.id = alert?.id ?? uuid();
        this.type = alert?.type ?? 'info';
        this.message = alert?.message ?? '';
        this.title = alert?.title ?? '';
    }
}
