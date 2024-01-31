'use client';

import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Company } from 'app/companies/models/Company';

interface CompanyCreateFormParams {
    initialData: Company;
}

const CompanyCreateFormSchema = z.object({
    name: z.string().min(1, 'Company name is required'),
    email: z.string().email('Invalid email'),
    code: z.string().min(1, 'Company code is required'),
    phone: z.string().min(1, 'Phone is required'),
    logoUrl: z.string().min(1, 'Logo is required'),
});

export type CompanyCreateFormDto = z.infer<typeof CompanyCreateFormSchema>;

export const CompanyCreateForm = ({ initialData }: CompanyCreateFormParams) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CompanyCreateFormDto>({
        resolver: zodResolver(CompanyCreateFormSchema),
        defaultValues: initialData,
    });

    const onSubmit: SubmitHandler<CompanyCreateFormDto> = async (data) => {
        console.log(data);
    };

    return (
        <form className="w-96" onSubmit={handleSubmit(onSubmit)}>
            <Input
                required
                id="name"
                label="Company Name"
                placeholder="Company Name"
                error={errors.name?.message}
                {...register('name')}
            />

            <Input
                required
                id="email"
                label="Company Email"
                placeholder="example@email.com"
                error={errors.email?.message}
                {...register('email')}
                disabled
            />

            <Input
                required
                id="code"
                label="Company Code"
                placeholder="Company Code"
                error={errors.code?.message}
                {...register('code')}
            />

            <Input
                required
                id="phone"
                label="Phone"
                placeholder="Phone"
                error={errors.phone?.message}
                {...register('phone')}
            />
            <div className="flex justify-end">
                <Button className="w-24" type="submit">
                    Register
                </Button>
            </div>
        </form>
    );
};
