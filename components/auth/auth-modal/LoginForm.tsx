import {
    Anchor,
    Button,
    Divider,
    Group,
    PasswordInput,
    Stack,
    TextInput,
} from '@mantine/core';
import { FacebookButton, GoogleButton } from '../utils/SocialButtons';
import { useForm } from '@mantine/form';
import useAuth from '../../../stores/useAuth';
import useAlert from '../../../stores/useAlert';
import { parseError } from '../../../api/api';
import { Alert, AlertType } from '../../../models/Alert';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';

interface Props {
    switchToRegistration: () => void;
    closeModal: () => void;
}

export const LoginForm = ({ switchToRegistration, closeModal }: Props) => {
    const [login] = useAuth((state) => [state.login]);
    const [createAlert] = useAlert((state) => [state.createAlert]);

    const form = useForm({
        initialValues: {
            email: '',
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

    const handleLogin = async () => {
        const { email, password } = form.values;

        try {
            await login({ email, password });
            closeModal();
            const alert = new Alert({
                message: 'Successfuly logged in',
                type: AlertType.success,
                title: 'Success!',
            });
            createAlert(alert);
        } catch (error) {
            if (error instanceof AxiosError) {
                const alert = parseError(error).toAlert();
                createAlert(alert);
            }
        }
    };

    return (
        <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.25 }}
        >
            {/*<Group grow mb="md" mt="md">*/}
            {/*    <GoogleButton radius="xl">Google</GoogleButton>*/}
            {/*    <FacebookButton radius="xl">Facebook</FacebookButton>*/}
            {/*</Group>*/}

            {/*<Divider*/}
            {/*    label="Or continue with email"*/}
            {/*    labelPosition="center"*/}
            {/*    my="lg"*/}
            {/*/>*/}

            <form onSubmit={form.onSubmit(() => handleLogin())}>
                <Stack>
                    <TextInput
                        required
                        label="Email"
                        placeholder="Email"
                        value={form.values.email}
                        onChange={(event) =>
                            form.setFieldValue(
                                'email',
                                event.currentTarget.value,
                            )
                        }
                        error={form.errors.email}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Password"
                        value={form.values.password}
                        onChange={(event) =>
                            form.setFieldValue(
                                'password',
                                event.currentTarget.value,
                            )
                        }
                        error={form.errors.password}
                        radius="md"
                    />
                    <Group position={'apart'}>
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            size="xs"
                            onClick={() => switchToRegistration()}
                        >
                            {`Don't have an account? Apply here`}
                        </Anchor>
                        <Button w={140} type="submit" radius="xl">
                            Login
                        </Button>
                    </Group>
                </Stack>
            </form>
        </motion.div>
    );
};
