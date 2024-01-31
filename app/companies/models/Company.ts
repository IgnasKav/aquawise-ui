import { User } from '../../auth/models/User';

export type Company = {
    id: string;
    name: string;
    email: string;
    code: string;
    phone: string;
    status: CompanyStatus;
    brandColor: string;
    logoUrl?: string;
    users: User[];
};

export type CompanyStatus = 'ApplicationPending' | 'Confirmed';
