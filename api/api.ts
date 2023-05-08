import axios, { AxiosError, AxiosResponse } from 'axios';
import { LoginRequest } from '../models/auth/LoginRequest';
import { RegisterRequest } from '../models/auth/RegisterRequest';
import { LoginResponse } from '../models/auth/LoginResponse';
import { getCookie } from 'cookies-next';
import { ApiError } from '../models/ApiError';
import { User } from '../models/User';
import { CompanyCreateDto } from '../models/companies/CompanyCreate.dto';
import { Company } from '../models/companies/Company';
import { RegisterResponse } from '../models/auth/RegisterResponse';

const ApiUrl = process.env.API_URL;

axios.defaults.baseURL = `${ApiUrl}`;

axios.interceptors.request.use((config) => {
    const token = getCookie('jwt');
    if (token && config?.headers)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const responseBody = (response: AxiosResponse) => response.data;
const parseError = (error: AxiosError): ApiError => {
    const data = error.response?.data as Partial<ApiError>;
    return new ApiError(data);
};

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) =>
        axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
};

const Auth = {
    login: (req: LoginRequest): Promise<LoginResponse> =>
        requests.post('/auth/login', req),
    register: async (
        userRegistrationId: string,
        req: RegisterRequest,
    ): Promise<RegisterResponse> => {
        return await requests.post(
            `/auth/register?userRegistrationId=${userRegistrationId}`,
            req,
        );
    },
    registerAdmin: async (
        companyRegistrationId: string,
        req: RegisterRequest,
    ): Promise<RegisterResponse> => {
        return await requests.post(
            `/auth/register?companyRegistrationId=${companyRegistrationId}`,
            req,
        );
    },
    current: (): Promise<User> => requests.get('auth/current'),
    getByRegistrationId: (registrationId: string): Promise<User> =>
        requests.get(`auth?userRegistrationId=${registrationId}`),
};

const Companies = {
    getAll: (): Promise<Company[] | undefined> => requests.get(`/companies`),

    getByApplicationId: (applicationId: string): Promise<Company> =>
        requests.get(`/companies/application/${applicationId}`),

    create: (createRequest: CompanyCreateDto): Promise<Company> =>
        requests.post('/companies', createRequest),

    confirmApplication: (applicationId: string): Promise<Company> =>
        requests.post(`/companies/confirm/${applicationId}`, {}),
};

const api = {
    Auth,
    Companies,
};

export { api, parseError };
