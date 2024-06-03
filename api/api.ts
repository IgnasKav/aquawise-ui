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
import { ImagesApi as Images } from './images/ImagesApi';
import { ClientsApi as Clients } from './clients/ClientsApi';
import { ProductFormDto } from 'app/products/components/forms/ProductForm';
import { CompanyApplicationFormDto } from 'app/auth/components/auth-modal/CompanyApplicationForm';
import { UsersApi as Users } from './users/users-api';
import { SearchResponse } from './models/SearchResponse';
import { ProductsSearchRequest } from 'app/products/models/products-search-request';

export const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

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

export type FetchResponse<T> = SuccessfulFetch<T> | FailedFetch | EmptyFetch;

type EmptyFetch = {
    isError: false;
    data: null;
};

type SuccessfulFetch<T> = {
    data: T;
    isError: false;
};

type FailedFetch = {
    isError: true;
} & ApiError;

const processFetchResponse = async <T>(
    resp: Response,
): Promise<FetchResponse<T>> => {
    if (!resp.ok) {
        const error = (await resp.json()) as Partial<ApiError>;

        return {
            isError: true,
            message: error.message ?? '',
            statusCode: error.statusCode ?? 0,
            timeStamp: error.timeStamp ?? '',
        };
    }

    let data: T | null = null;

    try {
        data = (await resp.json()) as T;
    } catch (e) {}

    if (data === null) {
        return { isError: false, data: null };
    }

    return { isError: false, data };
};

const post = async <T>(
    url: string,
    body: object,
    isFormData?: boolean,
): Promise<FetchResponse<T>> => {
    const token = await api.getJwt();

    const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
    };

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(`${ApiUrl}${url}`, {
        method: 'POST',
        headers,
        body: isFormData ? (body as FormData) : JSON.stringify(body),
    });

    return processFetchResponse(res);
};

const get = async <T>(url: string): Promise<FetchResponse<T>> => {
    const token = await api.getJwt();

    const res = await fetch(`${ApiUrl}${url}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return processFetchResponse(res);
};

const put = async <T>(
    url: string,
    body: object,
    isFormData = false,
): Promise<FetchResponse<T>> => {
    const token = await api.getJwt();

    const res = await fetch(`${ApiUrl}${url}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': isFormData
                ? 'multipart/form-data'
                : 'application/json',
        },
        body: JSON.stringify(body),
    });

    return processFetchResponse(res);
};

const del = async <T>(url: string): Promise<FetchResponse<T>> => {
    const token = await api.getJwt();

    const res = await fetch(`${ApiUrl}${url}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return processFetchResponse(res);
};

const requests = {
    get,
    post,
    put,
    del,
};

const Auth = {
    login: (req: LoginRequest) =>
        requests.post<LoginResponse>('/auth/login', req),
    register: async (req: RegisterRequest) =>
        await requests.post<RegisterResponse>(`/auth/register`, req),
    current: () => requests.get<User>('auth/current'),
    getByRegistrationId: (registrationId: string) =>
        requests.get<User>(`/auth/register?registrationId=${registrationId}`),
};

const Companies = {
    getAll: () => requests.get<Company[] | undefined>(`/companies`),
    applyForAccount: (createRequest: CompanyApplicationFormDto) =>
        requests.post<Company>('/companies/application', createRequest),
    confirmApplication: (registrationId: string) =>
        requests.post<Company>(`/companies/confirm/${registrationId}`, {}),
    getById: (id: string) => requests.get<Company>(`/companies/${id}`),
    saveColor: (id: string, color: string | undefined) =>
        requests.put<void>(`/companies/${id}`, { brandColor: color }),
};

const Products = {
    search: (req: ProductsSearchRequest) =>
        requests.post<SearchResponse<Product>>('/products/search', req),
    getById: (productId: string) =>
        requests.get<Company>(`/products/${productId}`),
    create: (req: ProductFormDto) => requests.post<Product>('/products', req),
    update: (productId: string, req: ProductFormDto) =>
        requests.put<Product>(`/products/${productId}`, req),
    delete: (productId: string) => requests.del<void>(`/products/${productId}`),
};

const api = {
    Auth,
    Companies,
    Products,
    Images,
    Clients,
    Users,
    getJwt,
};

export { api, requests };
