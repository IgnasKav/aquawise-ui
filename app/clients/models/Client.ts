export type Client = {
    id: string;
    email: string;
    name: string;
    phone: string;
    address: string;
    type: ClientType;
};

export type ClientType = 'person' | 'company';
