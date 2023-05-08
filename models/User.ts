import { Company } from './companies/Company';

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: UserRole;
    isRegistered: boolean;
    userRegistrationId: string;
    company: Company;

    constructor() {
        this.id = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.role = UserRole.User;
        this.isRegistered = false;
        this.userRegistrationId = '';
        this.company = new Company({});
    }
}

export enum UserRole {
    User = 'User',
    Admin = 'Admin',
    Support = 'Support',
}
