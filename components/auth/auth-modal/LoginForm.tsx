'use client';

import {
    Anchor,
    Button,
    Group,
    PasswordInput,
    Stack,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import useAlert from '../../../stores/useAlert';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { Alert, AlertType } from '../../../models/Alert';

interface Props {
    switchToRegistration: () => void;
    closeModal: () => void;
}

export const LoginForm = ({ switchToRegistration, closeModal }: Props) => {
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

        const res = await signIn('credentials', {
            redirect: false,
            email: email,
            password,
        });

        if (!res) return;

        if (!res?.ok) {
            const alert = new Alert({
                type: AlertType.error,
                title: 'Failed to login',
                message: res.error ?? '',
            });

            createAlert(alert);
            return;
        }

        closeModal();
    };

    return (
        <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.25 }}
        >
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
                    <Group justify="space-between">
                        <Anchor
                            component="button"
                            type="button"
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
