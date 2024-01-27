import { api } from 'api/api';
import {
    UserRegisterForm,
    UserRegisterFormDto,
} from './components/UserRegisterForm';

interface UserRegisterPageParams {
    registrationId: string;
}

const UserRegisterPage = async ({
    searchParams,
}: {
    searchParams: UserRegisterPageParams;
}) => {
    const { registrationId } = searchParams;

    const user = await api.Auth.getByRegistrationId(registrationId);

    if (!user) {
        return (
            <div className="flex justify-center">
                <h1>Link is no longer active</h1>
            </div>
        );
    }

    const initialData: UserRegisterFormDto = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        password: '',
    };

    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-xl mb-6">
                    Create an account for {`${user.company.name} `}
                    and begin using Aquawise!
                </h1>
                <UserRegisterForm initialData={initialData} />
            </div>
        </>
    );
};

export default UserRegisterPage;
