import { api } from 'api/api';
import {
    UserRegisterForm,
    UserRegisterFormDto,
} from './components/UserRegisterForm';

type InvitationRegisterPageParams = {
    companyId: string;
};

const InvitationRegisterPage = async ({
    searchParams,
}: {
    searchParams: InvitationRegisterPageParams;
}) => {
    const { companyId } = searchParams;
    const company = await api.Companies.getById(companyId);

    const initialUserFormData: UserRegisterFormDto = {
        email: company.email,
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
    };

    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-xl mb-6 max-w-xl text-center">
                    {`Congratulations, your company '${company.name}' has been approved for account!  Please create admin account below.`}
                </h1>
                <UserRegisterForm initialData={initialUserFormData} />
            </div>
        </>
    );
};

export default InvitationRegisterPage;
