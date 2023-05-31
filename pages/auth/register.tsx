import { Center } from '@mantine/core';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { useRouter } from 'next/router';

interface RegisterQueryParams {
    userRegistrationId?: string;
    companyRegistrationId?: string;
}

const Register = () => {
    const router = useRouter();
    const { userRegistrationId, companyRegistrationId } =
        router.query as RegisterQueryParams;
    return (
        <Center>
            <RegisterForm
                userRegistrationId={userRegistrationId}
                companyRegistrationId={companyRegistrationId}
            />
        </Center>
    );
};

export default Register;
