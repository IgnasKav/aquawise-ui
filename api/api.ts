import axios, { AxiosResponse } from 'axios';
import { LoginRequest } from '../app/auth/register/models/LoginRequest';
import { RegisterRequest } from '../app/auth/register/models/RegisterRequest';
import { LoginResponse } from '../app/auth/register/models/LoginResponse';
import { ApiError } from './models/ApiError';
import { User } from '../app/auth/models/User';
import { Company } from '../app/companies/models/Company';
import { RegisterResponse } from '../app/auth/register/models/RegisterResponse';
import { Product } from '../app/products/models/Product';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../app/api/auth/[...nextauth]/route';
import { getSession } from 'next-auth/react';
import { ImagesApi as Images } from './images/imagesApi';
import { ProductFormDto } from 'app/products/components/forms/ProductForm';
import { CompanyApplicationFormDto } from 'app/auth/components/auth-modal/CompanyApplicationForm';

export const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = `${ApiUrl}`;

// this file is used by server and client components, which get session differently
const getJwt = async (): Promise<string | undefined> => {
    let jwt = '';

    // server side
    if (typeof window === 'undefined') {
        // @ts-expect-error user type is wrong in next auth
        jwt = (await getServerSession(nextAuthOptions))?.user?.jwt;
    }
    // client side
    else {
        // @ts-expect-error user type is wrong in next auth
        jwt = (await getSession())?.user?.jwt;
    }

    return jwt;
};

axios.interceptors.request.use(async (config) => {
    const token = await getJwt();
    if (token && config?.headers)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(
    (response) => response, // Simply return the response for successful requests
    (error) => {
        // This function is called for all failed requests
        const data = error.response?.data as Partial<ApiError>;
        const parsedError = new ApiError(data);
        return Promise.reject(parsedError);
    },
);

const responseBody = (response: AxiosResponse) => response.data;

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
    register: async (req: RegisterRequest): Promise<RegisterResponse> => {
        return await requests.post(`/auth/register`, req);
    },
    current: (): Promise<User> => requests.get('auth/current'),
    getByRegistrationId: (registrationId: string): Promise<User> =>
        requests.get(`/auth/register?registrationId=${registrationId}`),
};

const Companies = {
    getAll: (): Promise<Company[] | undefined> => requests.get(`/companies`),
    applyForAccount: (
        createRequest: CompanyApplicationFormDto,
    ): Promise<Company> =>
        requests.post('/companies/application', createRequest),
    confirmApplication: (registrationId: string): Promise<Company> =>
        requests.post(`/companies/confirm/${registrationId}`, {}),
    getById: (id: string): Promise<Company> => requests.get(`/companies/${id}`),
    saveColor: (id: string, color: string | undefined): Promise<void> =>
        requests.put(`/companies/${id}`, { brandColor: color }),
};

const Products = {
    getAll: (): Promise<Product[] | undefined> => requests.get('/products'),
    getById: (productId: string): Promise<Company> =>
        requests.get(`/products/${productId}`),
    create: (req: ProductFormDto): Promise<Product> =>
        requests.post('/products', req),
    update: (productId: string, req: ProductFormDto): Promise<Product> =>
        requests.put(`/products/${productId}`, req),
    delete: (productId: string): Promise<void> =>
        requests.del(`/products/${productId}`),
};

const api = {
    Auth,
    Companies,
    Products,
    Images,
};

export { api, requests };
