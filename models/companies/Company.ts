import { User } from '../User';

export class Company {
    id: string;
    name: string;
    code: string;
    email: string;
    phone: string;
    status: CompanyStatus;
    brandColor: string;
    logoUrl?: string;
    companyRegistrationId?: string;
    users: User[];

    constructor(dto: Partial<Company>) {
        this.id = dto.id ?? '';
        this.name = dto.name ?? '';
        this.code = dto.code ?? '';
        this.email = dto.email ?? '';
        this.phone = dto.phone ?? '';
        this.status = dto.status ?? CompanyStatus.Confirmed;
        this.brandColor = dto.brandColor ?? '';
        this.logoUrl = dto.logoUrl;
        this.companyRegistrationId = dto.companyRegistrationId;
        this.users = dto.users ?? [];
    }
}

export enum CompanyStatus {
    ApplicationPending = 'ApplicationPending',
    Confirmed = 'Confirmed',
}
