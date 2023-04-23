import { useToggle, upperFirst } from '@mantine/hooks';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
} from '@mantine/core';
import {FacebookButton, GoogleButton} from "./social-buttons/socialButtons";
import { useForm } from '@mantine/form';
import useAuth from "../../stores/useAuth";

export function LoginForm(props?: PaperProps) {
    const [user, login, register] = useAuth((state) => ([state.user, state.login, state.register]))
    const [type, toggle] = useToggle(['login', 'register']);

    const form = useForm({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val: string) => (val.length < 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleLogin = async () => {
        const {email, password}= form.values;
        await login({email, password})
    }

    const handleRegister = () => {
        const {firstName, lastName, email, password} = form.values;

    }

    const handleAuth = () => {
        if (!form.isValid()) return;

        switch (type) {
            case 'login':
                handleLogin();
                break;
            case 'register':
                handleRegister();
                break;
        }
    }

    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" weight={500}>
                Welcome to Mantine, {type} with
            </Text>

            <Group grow mb="md" mt="md">
                <GoogleButton radius="xl">Google</GoogleButton>
                <FacebookButton radius="xl">Facebook</FacebookButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg"/>

            <form onSubmit={form.onSubmit(() => {
            })}>
                <Stack>
                    {type === 'register' && (
                        <>
                            <TextInput
                                label="First Name"
                                placeholder="First Name"
                                value={form.values.firstName}
                                onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                                radius="md"
                            />
                            <TextInput
                                label="Last Name"
                                placeholder="Last Name"
                                value={form.values.lastName}
                                onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                                radius="md"
                            />
                        </>
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />

                    {type === 'register' && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                        />
                    )}
                </Stack>

                <Group position="apart" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        color="dimmed"
                        onClick={() => toggle()}
                        size="xs"
                    >
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" radius="xl" onClick={() => handleAuth()}>
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    )
}
