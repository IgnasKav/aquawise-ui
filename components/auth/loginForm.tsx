import {Anchor, Button, Divider, Group, PaperProps, PasswordInput, Stack, TextInput,} from '@mantine/core';
import {FacebookButton, GoogleButton} from "./social-buttons/socialButtons";
import {useForm} from '@mantine/form';
import useAuth from "../../stores/useAuth";
import Link from "next/link";
import useAlert from '../../stores/useAlert';
import {parseError} from '../../api/api';
import {Alert, AlertType} from '../../models/Alert';

export const LoginForm = (props?: PaperProps) => {
    const [login] = useAuth((state) => ([state.login]))
    const [createAlert] = useAlert((state) => ([state.createAlert]))

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val: string) => (val.length < 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleLogin = async () => {
        const {email, password}= form.values;

        try {
            await login({email, password})
            const alert = new Alert({
                message: 'Successfuly logged in',
                type: AlertType.success,
                title: 'Success!'
            })
            createAlert(alert)
        } catch(error) {
            const alert = parseError(error).toAlert();
            createAlert(alert)
        }
    }

    return (
        <>
            <Group grow mb="md" mt="md">
                <GoogleButton radius="xl">Google</GoogleButton>
                <FacebookButton radius="xl">Facebook</FacebookButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg"/>

            <form onSubmit={form.onSubmit(() => handleLogin())}>
                <Stack>
                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password}
                        radius="md"
                    />
                </Stack>

                <Group position="apart" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        color="dimmed"
                        size="xs"
                    >
                        <Link className="plain-link" href="/auth/register">{ `Don't have an account? Register` }</Link>
                    </Anchor>
                    <Button type="submit" radius="xl">
                          Login
                    </Button>
                </Group>
            </form>
        </>
    )
}
