export class CompanyClient {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    devices: Device[] = [];

    constructor(dto: Partial<CompanyClient>) {
        this.email = dto.email ?? '';
        this.phone = dto.phone ?? '';
        this.firstName = dto.firstName ?? '';
        this.lastName = dto.lastName ?? '';
        this.devices = dto?.devices?.map((o) => new Device(o)) ?? [];
    }
}

export class Device {
    mac: string;
    name: string;
    saltPercentage?: number;
    leak: boolean;

    constructor(dto: Partial<Device>) {
        this.mac = dto.mac ?? '';
        this.name = dto.name ?? '';
        this.saltPercentage = dto.saltPercentage;
        this.leak = dto.leak ?? false;
    }
}
