export class UpdateCompanyDto {
    logoUrl?: string;
    primaryColor?: string;

    constructor(data?: Partial<UpdateCompanyDto>) {
        this.logoUrl = data?.logoUrl;
        this.primaryColor = data?.primaryColor;
    }
}
