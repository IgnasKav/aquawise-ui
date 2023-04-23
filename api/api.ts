import axios, {AxiosResponse} from "axios";
import {LoginRequest} from "../models/Auth/LoginRequest";
import {RegisterRequest} from "../models/Auth/RegisterRequest";
import {LoginResponse} from "../models/Auth/LoginResponse";
import { getCookie } from 'cookies-next';

const ApiUrl = process.env.API_URL;

axios.defaults.baseURL = `${ApiUrl}`;

axios.interceptors.request.use((config) => {
    const token = getCookie('jwt');
    if (token && config?.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
};

const Auth = {
    login: (req: LoginRequest): Promise<LoginResponse> => requests.post('/auth/login', req),
    register: (req: RegisterRequest): Promise<void> => requests.post('/auth/register', req),
};

const api = {
    Auth
}

export default api;
