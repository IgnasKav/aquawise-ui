import { Center } from '@mantine/core';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { useRouter } from 'next/router';

interface RegisterQueryParams {
    companyRegistrationId?: string;
    userRegistrationId?: string;
}

const Register = () => {
    const router = useRouter();
    const { companyRegistrationId, userRegistrationId } =
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
