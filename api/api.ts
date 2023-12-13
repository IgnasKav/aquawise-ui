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
import { UserInviteRequest } from '../components/users/models/UserInviteRequest';
import { Product } from '../components/products/models/Product';
import { CompanyClient } from '../models/companies/CompanyClient';
import { Order } from '../components/orders/models/Order';
import { OrderUpdateRequest } from '../components/orders/models/OrderUpdateRequest';

import * as dotenv from 'dotenv';
dotenv.config({ path: `.env` });

export const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

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
    post: (url: string, body: object, isFormData?: boolean) => {
        const headers = isFormData
            ? { 'Content-Type': 'multipart/form-data' }
            : {};
        return axios.post(url, body, { headers }).then(responseBody);
    },
    put: (url: string, body: object, isFormData = false) => {
        const headers = isFormData
            ? { 'Content-Type': 'multipart/form-data' }
            : {};
        return axios.put(url, body, { headers }).then(responseBody);
    },
    del: (url: string) => axios.delete(url).then(responseBody),
};

const Auth = {
    login: (req: LoginRequest): Promise<LoginResponse> => {
        return requests.post('/auth/login', req);
    },
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
    inviteUser: (request: UserInviteRequest) =>
        requests.post(`/auth/invite`, request),
};

const Companies = {
    getAll: (): Promise<Company[] | undefined> => requests.get(`/companies`),
    getByApplicationId: (applicationId: string): Promise<Company> =>
        requests.get(`/companies/application/${applicationId}`),

    create: (createRequest: CompanyCreateDto): Promise<Company> =>
        requests.post('/companies', createRequest),

    confirmApplication: (applicationId: string): Promise<Company> =>
        requests.post(`/companies/confirm/${applicationId}`, {}),
    getById: (id: string): Promise<Company> => requests.get(`/companies/${id}`),
    getClients: (id: string): Promise<CompanyClient[]> =>
        requests.get(`/companies/${id}/clients`),
    getOrders: (id: string): Promise<Order[]> =>
        requests.get(`/companies/${id}/orders`),
    saveColor: (id: string, color: string | undefined): Promise<void> =>
        requests.put(`/companies/${id}`, { brandColor: color }),
};

const Orders = {
    update: (
        companyId: string,
        clientId: string,
        orderId: string,
        request: OrderUpdateRequest,
    ): Promise<Order> =>
        requests.put(
            `/companies/${companyId}/clients/${clientId}/orders/${orderId}`,
            request,
        ),
};

const Products = {
    getAll: (): Promise<Product[] | undefined> => requests.get('/products'),
    getById: (productId: string): Promise<Company> =>
        requests.get(`/products/${productId}`),
    create: (req: FormData): Promise<Product> =>
        requests.post('/products', req, true),
    update: (productId: string, req: FormData): Promise<Product> =>
        requests.put(`/products/${productId}`, req, true),
    delete: (productId: string): Promise<void> =>
        requests.del(`/products/${productId}`),
};

const api = {
    Auth,
    Companies,
    Products,
    Orders,
};

export { api, parseError };
