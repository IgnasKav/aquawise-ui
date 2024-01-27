import { api } from 'api/api';
import { CompanyCreateForm } from './components/CompanyRegisterForm';

interface CompanyRegisterPageParams {
    registrationId: string;
}

const CompanyRegisterPage = async ({
    searchParams,
}: {
    searchParams: CompanyRegisterPageParams;
}) => {
    const { registrationId } = searchParams;

    const company = await api.Companies.getByApplicationId(registrationId);

    if (!company) {
        return (
            <div className="flex justify-center">
                <h1>Link is no longer active</h1>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-xl mb-6">
                    {`Congratulations, your company '${company.name}' has been approved for account! `}
                </h1>
                <CompanyCreateForm initialData={company} />
            </div>
        </>
    );
};

export default CompanyRegisterPage;
