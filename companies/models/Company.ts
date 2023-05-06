export class Company {
    id: string;
    name: string;
    code: string;
    email: string;
    phone: string;
    status: CompanyStatus;
    logoUrl?: string;
    applicationId?: string;

    constructor(dto: Partial<Company>) {
        this.id = dto.id ?? '';
        this.name = dto.name ?? '';
        this.code = dto.code ?? '';
        this.email = dto.email ?? '';
        this.phone = dto.phone ?? '';
        this.status = dto.status ?? CompanyStatus.Confirmed;
        this.logoUrl = dto.logoUrl;
        this.applicationId = dto.applicationId;
    }
}

export enum CompanyStatus {
    ApplicationPending = 'ApplicationPending',
    Confirmed = 'Confirmed',
}
