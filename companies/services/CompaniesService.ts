import axios from 'axios';
import {CompanyCreateDto} from '../models/CompanyCreate.dto';

export const createCompany = async (createRequest: CompanyCreateDto) => {
    const response = await axios.post('/companies', createRequest);
    return response.data;
};

export const confirmApplication = async (applicationId: string) => {
    const response = await axios.post(`/companies/confirm/${applicationId}`);
    return response.data;
};

export const getCompanies = async () => {
    const response = await axios.get(`/companies`);
    return response.data;
};

export const getCompanyByApplicationId = async (applicationId: string) => {
    const response = await axios.get(`/companies/application/${applicationId}`);
    return response.data;
};

export const CompaniesService = {
    createCompany,
    confirmApplication,
    getCompanies,
    getCompanyByApplicationId,
};
