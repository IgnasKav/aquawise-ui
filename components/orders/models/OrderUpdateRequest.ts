import { OrderStatus } from './Order';

export class OrderUpdateRequest {
    status?: OrderStatus;
    responsibleUserId?: string;

    constructor(status?: OrderStatus, responsibleUserId?: string) {
        this.status = status;
        this.responsibleUserId = responsibleUserId;
    }
}
