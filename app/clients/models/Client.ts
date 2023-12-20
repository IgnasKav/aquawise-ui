import { v4 as uuid } from 'uuid';
import { Company } from '../../companies/models/Company';

export class Client {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    company: Company;

    constructor(data?: Partial<Client>) {
        this.id = data?.id ?? uuid();
        this.firstName = data?.firstName ?? '';
        this.lastName = data?.lastName ?? '';
        this.phone = data?.phone ?? '';
        this.address = data?.address ?? '';
        this.company = data?.company ?? new Company({});
    }
}
