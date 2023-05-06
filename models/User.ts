export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;

    constructor() {
        this.id = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.role = UserRole.User;
    }
}

export enum UserRole {
    User = 'User',
    Admin = 'Admin',
    Support = 'Support',
}
