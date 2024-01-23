import { AlertDto } from './models/AlertDto';
import useAlert from '../../stores/useAlert';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Bell, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

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

    const Icon = iconMapping[alert.type];

    return (
        <Alert
            className={cn(
                'grid',
                { 'border-green-600 text-green-600': alert.type === 'success' },
                { 'border-red-500 text-red-500': alert.type === 'error' },
                { 'border-cyan-500 text-cyan-500': alert.type === 'info' },
                className,
            )}
            onClick={() => removeAlert(alert.id)}
        >
            <Icon color="#06b6d4" />
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
            {/* <div className="ml-2">
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
            </div> */}
        </Alert>
    );
}
