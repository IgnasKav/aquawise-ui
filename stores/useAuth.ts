import { User } from '../models/User';
import { LoginRequest } from '../models/auth/LoginRequest';
import { RegisterRequest } from '../models/auth/RegisterRequest';
import { create } from 'zustand';
import { api } from '../api/api';
import { deleteCookie, setCookie } from 'cookies-next';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    login: (req: LoginRequest) => Promise<void>;
    getCurrent: () => Promise<void>;
    registerUser: (
        userRegistrationId: string,
        req: RegisterRequest,
    ) => Promise<void>;
    registerAdmin: (
        companyRegistrationId: string,
        req: RegisterRequest,
    ) => Promise<void>;
    logout: () => void;
}

const useAuth = create<AuthState>((set, get) => ({
    user: null,
    isLoading: true,
    login: async (req: LoginRequest) => {
        const loginInfo = await api.Auth.login(req);
        setCookie('jwt', loginInfo.jwt);
        set(() => ({ user: loginInfo.user }));
    },
    getCurrent: async () => {
        set(() => ({ isLoading: true }));
        try {
            const user = await api.Auth.current();
            set(() => ({ user: user, isLoading: false }));
        } catch {
            get().logout();
            set(() => ({ isLoading: false }));
        }
    },
    registerUser: async (userRegistrationId: string, req: RegisterRequest) => {
        const res = await api.Auth.register(userRegistrationId, req);
        setCookie('jwt', res.jwt);
        set(() => ({ user: res.user }));
    },
    registerAdmin: async (
        companyRegistrationId: string,
        req: RegisterRequest,
    ) => {
        const res = await api.Auth.registerAdmin(companyRegistrationId, req);
        setCookie('jwt', res.jwt);
        set(() => ({ user: res.user }));
    },
    logout: () => {
        set(() => ({ user: null }));
        deleteCookie('jwt');
    },
}));

export default useAuth;
