import {
    Button,
    LoadingOverlay,
    Select,
    Stack,
    TextInput,
} from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserRole } from '../../models/User';
import { UserInviteRequest } from './models/UserInviteRequest';
import useAlert from '../../stores/useAlert';
import { api, parseError } from '../../api/api';
import { Alert, AlertType } from '../../models/Alert';
import useAuth from '../../stores/useAuth';

export const UserInviteForm = () => {
    const [user] = useAuth((state) => [state.user]);
    const [createAlert] = useAlert((state) => [state.createAlert]);

    const { mutate, isLoading } = useMutation(api.Auth.inviteUser, {
        onSuccess: () => {
            const alert = new Alert({
                message: 'Invitation has been sent',
                type: AlertType.success,
                title: 'Success!',
            });
            createAlert(alert);
        },
        onError: (error: AxiosError) => {
            const alert = parseError(error).toAlert();
            createAlert(alert);
        },
    });

    const form: UseFormReturnType<UserInviteRequest> = useForm({
        initialValues: new UserInviteRequest(),
        validate: {
            email: (val: string) =>
                /^\S+@\S+$/.test(val) ? null : 'Invalid email',
        },
    });

    return (
        <form
            onSubmit={form.onSubmit(() =>
                mutate(
                    new UserInviteRequest({
                        ...form.values,
                        companyId: user?.company.id,
                    }),
                ),
            )}
        >
            <LoadingOverlay visible={isLoading} overlayBlur={0.5} />
            <Stack>
                <TextInput
                    required
                    label="Email"
                    placeholder="Email"
                    radius="md"
                    {...form.getInputProps('email')}
                />
                <Select
                    label="Role"
                    placeholder="Choose role"
                    data={[
                        { value: UserRole.User, label: 'User' },
                        { value: UserRole.Admin, label: 'Administrator' },
                    ]}
                    {...form.getInputProps('role')}
                />
                <Button w={140} type="submit" radius="xl">
                    Send invitation
                </Button>
            </Stack>
        </form>
    );
};
