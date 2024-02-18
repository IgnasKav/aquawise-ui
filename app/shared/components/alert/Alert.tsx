'use client';

import { AlertDto } from './models/AlertDto';
import useAlert from '../../../../stores/useAlert';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Bell, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import CloseButton from 'app/shared/components/icons/CloseIcon';
import { useEffect } from 'react';

interface Props {
    alert: AlertDto;
    className: string;
}

const iconMapping = {
    success: CheckCheck,
    error: AlertTriangle,
    info: Bell,
};

export function AlertComponent({ alert, className }: Props) {
    const [removeAlert] = useAlert((state) => [state.removeAlert]);

    useEffect(() => {
        const timer = setTimeout(() => {
            removeAlert(alert.id);
        }, 3000);

        return () => clearTimeout(timer); // This will clear the timeout if the component is unmounted before the timeout finishes
    }, [alert.id, removeAlert]);

    const Icon = iconMapping[alert.type];

    return (
        <Alert
            className={cn(
                'pointer-events-auto flex items-center gap-[11px]',
                {
                    'border-green-600 text-green-600': alert.type === 'success',
                },
                { 'border-red-500 text-red-500': alert.type === 'error' },
                { 'border-cyan-500 text-cyan-500': alert.type === 'info' },
                className,
            )}
        >
            <Icon color="#06b6d4" />
            <div className="">
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
            </div>
            <CloseButton
                onClick={() => removeAlert(alert.id)}
                className="absolute top-[-10px] right-[-10px]"
                color="red"
            />
        </Alert>
    );
}
