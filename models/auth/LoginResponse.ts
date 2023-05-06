import {User} from "../User";

export interface LoginResponse {
    user: User,
    jwt: string
}
