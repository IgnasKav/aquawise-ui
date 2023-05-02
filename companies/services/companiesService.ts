import axios from 'axios';
import { CompanyCreateDto } from '../models/companyCreate.dto';

export const createCompany = async (createRequest: CompanyCreateDto) => {
    const response = await axios.post('/companies', createRequest);
    return response.data;
};

export const CompaniesService = { createCompany };
