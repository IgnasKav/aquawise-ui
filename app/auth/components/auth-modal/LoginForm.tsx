'use client';

import useAlert from '../../../../stores/useAlert';
import { signIn } from 'next-auth/react';
import { AlertDto } from '../../../../components/alert/models/AlertDto';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { account } from 'app/appwrite/appwrite';

const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type LoginFormDto = z.infer<typeof LoginFormSchema>;

interface Props {
    switchToRegistration: () => void;
    closeModal: () => void;
}

const callApiRoute = async (data: LoginFormDto) => {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/account`,
        data,
    );
    console.log('route', res);
};

export const LoginForm = ({ switchToRegistration, closeModal }: Props) => {
    const [createAlert] = useAlert((state) => [state.createAlert]);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<LoginFormDto>({
        resolver: zodResolver(LoginFormSchema),
    });

    const onSubmit: SubmitHandler<LoginFormDto> = async (data) => {
        const { email, password } = data;
        const res = await account.createEmailSession(email, password);

        console.log(res);

        // callApiRoute(data);

        // const res = await signIn('credentials', {
        //     redirect: false,
        //     email,
        //     password,
        // });

        // if (!res) return;

        // if (!res?.ok) {
        //     const alert = new AlertDto({
        //         type: 'error',
        //         title: 'Failed to login',
        //         message: res.error ?? '',
        //     });

        //     createAlert(alert);
        //     return;
        // }

        // closeModal();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                id="email"
                label="Email"
                placeholder="Email"
                {...register('email')}
                error={errors.email?.message}
                required
            />
            <Input
                id="password"
                label="Password"
                placeholder="Password"
                type="password"
                {...register('password')}
                error={errors.password?.message}
                required
            />
            <div className="flex justify-between">
                <Button
                    className="pl-0 text-sm"
                    variant="link"
                    type="button"
                    onClick={() => switchToRegistration()}
                >
                    {`Don't have an account? Apply here`}
                </Button>
                <Button className="w-24" type="submit">
                    Login
                </Button>
            </div>
        </form>
    );
};
