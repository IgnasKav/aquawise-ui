import {Anchor, Button, Group, LoadingOverlay, Stack, Text, TextInput,} from '@mantine/core';
import {useForm, UseFormReturnType} from '@mantine/form';
import {useMutation} from '@tanstack/react-query';
import {CompaniesService} from '../../../companies/services/companiesService';
import {CompanyCreateDto} from '../../../companies/models/companyCreate.dto';
import {useState} from 'react';
import AnimatedCheckIcon from '../animatedCheckIcon';
import useAlert from '../../../stores/useAlert';
import {parseError} from '../../../api/api';

interface Props {
    switchToLogin: () => void;
}

export const ApplyForm = ({switchToLogin}: Props) => {
    const [createAlert] = useAlert((state) => [state.createAlert]);
    const [isSuccess, setSuccess] = useState(false);

    const { mutate, isLoading } = useMutation(CompaniesService.createCompany, {
        onSuccess: () => {
            setSuccess(true);
        },
        onError: (error) => {
            const alert = parseError(error).toAlert();
            createAlert(alert);
        },
    });

    const form: UseFormReturnType<CompanyCreateDto> = useForm({
        initialValues: new CompanyCreateDto({
            name: '',
            code: '',
            email: '',
            phone: '',
        }),
        validate: {
            email: (val: string) =>
                /^\S+@\S+$/.test(val) ? null : 'Invalid email',
            phone: (val: string) =>
                /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
                    val,
                )
                    ? null
                    : 'Invalid phone number',
        },
    });

    return (
        <>
            <form onSubmit={form.onSubmit(() => mutate(form.values))}>
                <LoadingOverlay visible={isLoading} overlayBlur={0.5} />
                {isSuccess ? (
                    <Stack align="center">
                        <AnimatedCheckIcon />
                        <Text color="green" fw={700} align={'center'}>
                            Your application has been received! You will receive an email once your application is
                            reviewed.
                        </Text>
                    </Stack>
                ) : (
                    <Stack>
                        <TextInput
                            required
                            label="Company name"
                            placeholder="Name"
                            radius="md"
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            required
                            label="Company code"
                            placeholder="Code"
                            radius="md"
                            {...form.getInputProps('code')}
                        />
                        <TextInput
                            required
                            label="Email"
                            placeholder="Email"
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
                        <Group position={'apart'}>
                            <Anchor
                                component="button"
                                type="button"
                                color="dimmed"
                                size="xs"
                                onClick={() => switchToLogin()}
                            >
                                {'Already have an account? Log in'}
                            </Anchor>
                            <Button w={140} type="submit" radius="xl">
                                Apply
                            </Button>
                        </Group>
                    </Stack>
                )}
            </form>
        </>
    );
};
