import {Anchor, Button, Divider, Group, Paper, PaperProps, PasswordInput, Stack, Text, TextInput,} from '@mantine/core';
import {FacebookButton, GoogleButton} from "./social-buttons/socialButtons";
import {useForm} from '@mantine/form';
import useAuth from "../../stores/useAuth";
import Link from "next/link";
import {parseError} from '../../api/api';
import useAlert from '../../stores/useAlert';
import {Alert, AlertType} from '../../models/Alert';

export const RegisterForm = (props?: PaperProps) => {
    const [register] = useAuth((state) => ([state.register]));
    const [createAlert] = useAlert((state) => ([state.createAlert]))

    const form = useForm({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: ''
        },

        validate: {
            email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val: string) => (val.length < 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const handleRegister = async () => {
        const {firstName, lastName, email, password} = form.values;

        try {
            await register({firstName, lastName, email, password});
            const alert = new Alert({
                message: 'Successfully registered, please confirm registration via email',
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
        <Paper shadow="md" radius="md" p="xl" withBorder {...props}>
            <Text size="lg" weight={500}>
                Welcome to Aquawise, register with
            </Text>

            <Group grow mb="md" mt="md">
                <GoogleButton radius="xl">Google</GoogleButton>
                <FacebookButton radius="xl">Facebook</FacebookButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg"/>

            <form onSubmit={form.onSubmit(() => handleRegister())}>
                <Stack>
                    <TextInput
                        required
                        label="First Name"
                        placeholder="First Name"
                        value={form.values.firstName}
                        onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                        radius="md"
                    />
                    <TextInput
                        required
                        label="Last Name"
                        placeholder="Last Name"
                        value={form.values.lastName}
                        onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                        radius="md"
                    />
                    <TextInput
                        required
                        label="Email"
                        placeholder="name@email.com"
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
                </Stack>

                <Group position="apart" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        color="dimmed"
                        size="xs"
                    >
                        <Link className="plain-link" href="/auth/login">Already have an account? Login</Link>
                    </Anchor>
                    <Button type="submit" radius="xl">
                        Register
                    </Button>
                </Group>
            </form>
        </Paper>
    )
}
