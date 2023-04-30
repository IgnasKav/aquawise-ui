import {User} from "../models/User";
import {LoginRequest} from "../models/Auth/LoginRequest";
import {RegisterRequest} from "../models/Auth/RegisterRequest";
import {create} from "zustand";
import {api} from "../api/api";
import {setCookie} from 'cookies-next';

interface AuthState {
    user: User | null,
    login: (req: LoginRequest) => Promise<void>,
    register: (req: RegisterRequest) => Promise<void>,
    logout: () => void
}

const useAuth = create<AuthState>((set) => ({
    user: null,
    jwt: null,
    login: async (req: LoginRequest) => {
        const loginInfo = await api.Auth.login(req);
        setCookie('jwt', loginInfo.jwt);
        set(() => ({user: loginInfo.user}))
    },
    register: async (req: RegisterRequest) => {
        await api.Auth.register(req);
    },
    logout: () => {}
}))

export default useAuth;
