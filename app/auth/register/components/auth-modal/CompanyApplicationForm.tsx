import { useMutation } from '@tanstack/react-query';
import useAlert from '../../../../../stores/useAlert';
import { api } from '../../../../../api/api';
import { ApiError } from '../../../../../api/models/ApiError';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SpinnerIcon from 'app/shared/components/loaders/SpinnerIcon';
import { AlertDto } from 'components/alert/models/AlertDto';

const CompanyApplicationFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    code: z.string().min(1, 'Code is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(1, 'Phone is required'),
});

export type CompanyApplicationFormDto = z.infer<
    typeof CompanyApplicationFormSchema
>;

interface Props {
    switchToLogin: () => void;
}

export const CompanyApplicationForm = ({ switchToLogin }: Props) => {
    const [createAlert] = useAlert((state) => [state.createAlert]);

    const { mutate, isPending } = useMutation({
        mutationFn: api.Companies.applyForAccount,
        onError: (error: ApiError) => {
            const alert = error.toAlert();

            createAlert(alert);
        },
        onSuccess: () => {
            const alert = new AlertDto({
                type: 'success',
                title: 'Success',
                message: 'Your application has been received!',
            });

            createAlert(alert);
        },
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CompanyApplicationFormDto>({
        resolver: zodResolver(CompanyApplicationFormSchema),
    });

    const onSubmit: SubmitHandler<CompanyApplicationFormDto> = async (data) => {
        mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                required
                id="name"
                label="Company name"
                placeholder="Name"
                error={errors.name?.message}
                {...register('name')}
            />
            <Input
                required
                id="code"
                label="Company code"
                placeholder="Code"
                error={errors.code?.message}
                {...register('code')}
            />
            <Input
                required
                id="email"
                label="Email"
                placeholder="Email"
                error={errors.email?.message}
                {...register('email')}
            />
            <Input
                required
                id="phone"
                label="Phone"
                placeholder="Phone"
                error={errors.phone?.message}
                {...register('phone')}
            />
            <div className="flex justify-between">
                <Button
                    className="pl-0 text-sm"
                    variant="link"
                    onClick={() => switchToLogin()}
                >
                    {`Already have an account? Log in`}
                </Button>
                <Button className="w-24" type="submit">
                    {isPending ? <SpinnerIcon /> : 'Apply'}
                </Button>
            </div>
        </form>
    );
};
