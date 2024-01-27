import { UserRole } from '../../../app/auth/models/User';

export class UserInviteRequest {
    email: string;
    role: UserRole;
    companyId: string;

    constructor(dto?: Partial<UserInviteRequest>) {
        this.email = dto?.email ?? '';
        this.role = dto?.role ?? UserRole.User;
        this.companyId = dto?.companyId ?? '';
    }
}
