export class CompanyCreateDto {
    name: string;
    code: string;
    phone: string;
    email: string;
    logoUrl?: string;

    constructor(dto?: Partial<CompanyCreateDto>) {
        this.name = dto?.name ?? '';
        this.code = dto?.code ?? '';
        this.phone = dto?.phone ?? '';
        this.email = dto?.email ?? '';
        this.logoUrl = dto?.logoUrl;
    }
}
