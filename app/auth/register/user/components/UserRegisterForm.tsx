'use client';

import { useMutation } from '@tanstack/react-query';
import useAlert from 'stores/useAlert';
import { RegisterRequest } from '../../models/RegisterRequest';
import { ApiError } from 'api/models/ApiError';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { api } from 'api/api';

interface UserRegisterFormParams {
    initialData: UserRegisterFormDto;
}

interface RegisterUserPayload {
    req: RegisterRequest;
    userRegistrationId: string;
}

interface RegisterAdminPayload {
    req: RegisterRequest;
    companyRegistrationId: string;
}

const UserRegisterFormSchema = z.object({
    email: z.string().email('Invalid email'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phone: z.string().min(1, 'Phone is required'),
    password: z.string().min(1, 'Password is required'),
});

export type UserRegisterFormDto = z.infer<typeof UserRegisterFormSchema>;

export const UserRegisterForm = ({ initialData }: UserRegisterFormParams) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<UserRegisterFormDto>({
        resolver: zodResolver(UserRegisterFormSchema),
        defaultValues: initialData,
    });

    const router = useRouter();
    const [createAlert] = useAlert((state) => [state.createAlert]);

    const { mutate: createUser } = useMutation({
        mutationFn: ({ userRegistrationId, req }: RegisterUserPayload) =>
            api.Auth.register(userRegistrationId, req),
        onSuccess: () => router.push('/'),
        onError: (error: ApiError) => {
            createAlert(error.toAlert());
        },
    });

    const { mutate: createAdmin } = useMutation({
        mutationFn: ({ companyRegistrationId, req }: RegisterAdminPayload) =>
            api.Auth.registerAdmin(companyRegistrationId, req),
        onSuccess: () => router.push('/'),
        onError: (error: ApiError) => {
            createAlert(error.toAlert());
        },
    });

    const onSubmit: SubmitHandler<UserRegisterFormDto> = async (data) => {
        console.log(data);
    };

    return (
        <form className="w-96" onSubmit={handleSubmit(onSubmit)}>
            <Input
                required
                id="email"
                label="Email"
                placeholder="example@email.com"
                error={errors.email?.message}
                {...register('email')}
                disabled
            />

            <Input
                required
                id="firstName"
                label="First Name"
                placeholder="First Name"
                error={errors.firstName?.message}
                {...register('firstName')}
            />

            <Input
                required
                id="lastName"
                label="Last Name"
                placeholder="Last Name"
                error={errors.lastName?.message}
                {...register('lastName')}
            />

            <Input
                required
                id="phone"
                label="Phone"
                placeholder="Phone"
                error={errors.phone?.message}
                {...register('phone')}
            />

            <Input
                required
                id="password"
                label="Password"
                placeholder="Password"
                type="password"
                error={errors.password?.message}
                {...register('password')}
            />
            <div className="flex justify-end">
                <Button className="w-24" type="submit">
                    Register
                </Button>
            </div>
        </form>
    );
};
