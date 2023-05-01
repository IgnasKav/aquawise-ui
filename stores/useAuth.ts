import {User} from "../models/User";
import {LoginRequest} from "../models/Auth/LoginRequest";
import {RegisterRequest} from "../models/Auth/RegisterRequest";
import {create} from "zustand";
import {api} from "../api/Api";
import {deleteCookie, setCookie} from 'cookies-next';

interface AuthState {
    user: User | null,
    isLoading: boolean,
    login: (req: LoginRequest) => Promise<void>,
    getCurrent: () => Promise<void>,
    register: (req: RegisterRequest) => Promise<void>,
    logout: () => void
}

const useAuth = create<AuthState>((set,get) => ({
    user: null,
    isLoading: true,
    login: async (req: LoginRequest) => {
        set(() => ({isLoading: true}));
        const loginInfo = await api.Auth.login(req);
        setCookie('jwt', loginInfo.jwt);
        set(() => ({user: loginInfo.user, isLoading: false}))
    },
    getCurrent: async () => {
        set(() => ({isLoading: true}));
        try {
            const user = await api.Auth.current();
            set(() => ({user: user, isLoading: false}))
        } catch {
            get().logout();
            set(() => ({isLoading: false}));
        }
    },
    register: async (req: RegisterRequest) => {
        await api.Auth.register(req);
    },
    logout: () => {
        set(() => ({user: null}))
        deleteCookie('jwt');
    }
}))

export default useAuth;
