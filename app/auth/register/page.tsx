import { api } from 'api/api';
import {
    UserRegisterForm,
    UserRegisterFormDto,
} from './components/UserRegisterForm';

type RegisterPageParams = {
    registrationId: string;
};

const RegisterPage = async ({
    searchParams,
}: {
    searchParams: RegisterPageParams;
}) => {
    const { registrationId } = searchParams;
    const user = await api.Auth.getByRegistrationId(registrationId);

    const initialUserFormData: UserRegisterFormDto = {
        email: user.email,
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
    };

    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-xl mb-6 max-w-xl text-center">
                    {`Congratulations, your company '${user.company.name}' has been approved for account!  Please create admin account below.`}
                </h1>
                <UserRegisterForm
                    initialData={initialUserFormData}
                    registrationId={registrationId}
                />
            </div>
        </>
    );
};

export default RegisterPage;
