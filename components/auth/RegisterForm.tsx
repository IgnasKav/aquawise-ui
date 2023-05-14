import {
    Button,
    Center,
    Divider,
    Group,
    Loader,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { FacebookButton, GoogleButton } from './utils/SocialButtons';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api, parseError } from '../../api/api';
import { useEffect } from 'react';
import { RegisterRequest } from '../../models/auth/RegisterRequest';
import useAuth from '../../stores/useAuth';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import useAlert from '../../stores/useAlert';

interface RegisterFormArgs {
    companyRegistrationId?: string;
    userRegistrationId?: string;
}

interface RegisterUserPayload {
    req: RegisterRequest;
    userRegistrationId: string;
}

interface RegisterAdminPayload {
    req: RegisterRequest;
    companyRegistrationId: string;
}

export const RegisterForm = ({
    companyRegistrationId,
    userRegistrationId,
}: RegisterFormArgs) => {
    const router = useRouter();
    const [createAlert] = useAlert((state) => [state.createAlert]);
    const [registerUser, registerAdmin] = useAuth((state) => [
        state.registerUser,
        state.registerAdmin,
    ]);

    const { data: company, isError: isCompanyError } = useQuery(
        ['company', companyRegistrationId],
        () => api.Companies.getByApplicationId(companyRegistrationId as string),
        { enabled: companyRegistrationId != null },
    );

    const { data: user, isError: isUserError } = useQuery(
        ['user', userRegistrationId],
        () => api.Auth.getByRegistrationId(userRegistrationId as string),
        { enabled: userRegistrationId != null },
    );

    const { mutate: createUser } = useMutation(
        ({ userRegistrationId, req }: RegisterUserPayload) =>
            registerUser(userRegistrationId, req),
        {
            onSuccess: () => router.push('/'),
            onError: (error: AxiosError) => {
                const alert = parseError(error).toAlert();
                createAlert(alert);
            },
        },
    );

    const { mutate: createAdmin } = useMutation(
        ({ companyRegistrationId, req }: RegisterAdminPayload) =>
            registerAdmin(companyRegistrationId, req),
        {
            onSuccess: () => router.push('/'),
            onError: (error: AxiosError) => {
                const alert = parseError(error).toAlert();
                createAlert(alert);
            },
        },
    );

    const form: UseFormReturnType<RegisterRequest> = useForm({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            password: '',
        },

        validate: {
            email: (val: string) =>
                /^\S+@\S+$/.test(val) ? null : 'Invalid email',
            password: (val: string) =>
                val.length < 6
                    ? 'Password should include at least 6 characters'
                    : null,
            phone: (val: string) =>
                /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
                    val,
                )
                    ? null
                    : 'Invalid phone number',
        },
    });

    useEffect(() => {
        console.log(userRegistrationId);
        if (company != null || user != null) {
            form.setValues({
                email: company?.email ?? user?.email,
            });
        }
    }, [company, user]);

    return (
        <Paper shadow="md" radius="md" p="xl" m="xl" withBorder>
            {isCompanyError ||
                (isUserError && (
                    <Center>
                        <Text>Link is no longer active</Text>
                    </Center>
                ))}
            {!company && !user && !isCompanyError && !isUserError ? (
                <Loader />
            ) : (
                <>
                    <Text size="lg" weight={500}>
                        Create an account for{' '}
                        {company?.name || user?.company.name} and begin using
                        Aquawise!
                    </Text>

                    {/*<Group grow mb="md" mt="md">*/}
                    {/*    <GoogleButton radius="xl">Google</GoogleButton>*/}
                    {/*    <FacebookButton radius="xl">Facebook</FacebookButton>*/}
                    {/*</Group>*/}

                    {/*<Divider*/}
                    {/*    label="Or continue with email"*/}
                    {/*    labelPosition="center"*/}
                    {/*    my="lg"*/}
                    {/*/>*/}

                    <form
                        onSubmit={form.onSubmit(() => {
                            if (companyRegistrationId) {
                                createAdmin({
                                    companyRegistrationId:
                                        companyRegistrationId,
                                    req: form.values,
                                });
                            } else if (userRegistrationId) {
                                createUser({
                                    userRegistrationId: userRegistrationId,
                                    req: form.values,
                                });
                            }
                        })}
                    >
                        <Stack>
                            <TextInput
                                required
                                label="First Name"
                                placeholder="First Name"
                                value={form.values.firstName}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        'firstName',
                                        event.currentTarget.value,
                                    )
                                }
                                radius="md"
                            />
                            <TextInput
                                required
                                label="Last Name"
                                placeholder="Last Name"
                                value={form.values.lastName}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        'lastName',
                                        event.currentTarget.value,
                                    )
                                }
                                radius="md"
                            />
                            <TextInput
                                required
                                label="Email"
                                placeholder="name@email.com"
                                disabled={true}
                                error={form.errors.email && 'Invalid email'}
                                radius="md"
                                {...form.getInputProps('email')}
                            />
                            <TextInput
                                required
                                label="Phone"
                                placeholder="Phone"
                                radius="md"
                                {...form.getInputProps('phone')}
                            />
                            <PasswordInput
                                required
                                label="Password"
                                placeholder="Your password"
                                value={form.values.password}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        'password',
                                        event.currentTarget.value,
                                    )
                                }
                                error={
                                    form.errors.password &&
                                    'Password should include at least 6 characters'
                                }
                                radius="md"
                            />
                            <Center>
                                <Button w={140} type="submit" radius="xl">
                                    Register
                                </Button>
                            </Center>
                        </Stack>
                    </form>
                </>
            )}
        </Paper>
    );
};
