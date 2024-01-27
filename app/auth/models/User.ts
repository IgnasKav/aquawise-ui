import { Company } from '../../companies/models/Company';

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: UserRole;
    isRegistered: boolean;
    userRegistrationId: string;
    company: Company;
};

export type UserRole = 'User' | 'Admin' | 'Support';
