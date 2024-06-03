import { User } from '../../models/User';

export interface RegisterResponse {
    user: User;
    jwt: string;
}
