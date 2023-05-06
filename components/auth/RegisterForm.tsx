import {
    Button,
    Center,
    Divider,
    Group,
    Loader,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import {FacebookButton, GoogleButton} from './utils/SocialButtons';
import {useForm} from '@mantine/form';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {CompaniesService} from '../../companies/services/CompaniesService';

export const RegisterForm = (props?: PaperProps) => {
    const router = useRouter();
    const { applicationId } = router.query;

    const { data: company, isLoading } = useQuery(
        ['company', applicationId],
        () =>
            CompaniesService.getCompanyByApplicationId(applicationId as string),
        { enabled: applicationId != null },
    );

    const form = useForm({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
        },

        validate: {
            email: (val: string) =>
                /^\S+@\S+$/.test(val) ? null : 'Invalid email',
            password: (val: string) =>
                val.length < 6
                    ? 'Password should include at least 6 characters'
                    : null,
        },
    });

    const handleRegister = async () => {
        console.log(applicationId);
        // const { firstName, lastName, email, password } = form.values;
        //
        // try {
        //     await register({ firstName, lastName, email, password });
        //     const alert = new Alert({
        //         message:
        //             'Successfully registered, please confirm registration via email',
        //         type: AlertType.success,
        //         title: 'Success!',
        //     });
        //     createAlert(alert);
        // } catch (error) {
        //     const alert = parseError(error).toAlert();
        //     createAlert(alert);
        // }
    };

    return (
        <Paper shadow="md" radius="md" p="xl" m="xl" withBorder {...props}>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Text size="lg" weight={500}>
                        Create and account for {company.name} and begin using
                        Aquawise!
                    </Text>

                    <Group grow mb="md" mt="md">
                        <GoogleButton radius="xl">Google</GoogleButton>
                        <FacebookButton radius="xl">Facebook</FacebookButton>
                    </Group>

                    <Divider
                        label="Or continue with email"
                        labelPosition="center"
                        my="lg"
                    />

                    <form onSubmit={form.onSubmit(() => handleRegister())}>
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
                                value={form.values.email}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        'email',
                                        event.currentTarget.value,
                                    )
                                }
                                error={form.errors.email && 'Invalid email'}
                                radius="md"
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
