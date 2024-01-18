import { Alert as MantineAlert } from '@mantine/core';
import { AlertDto } from './models/AlertDto';
import useAlert from '../../stores/useAlert';
import { IconAlertCircle } from '@tabler/icons-react';
interface Props {
    alert: AlertDto;
    className: string;
}

export function AlertComponent({ alert, className }: Props) {
    const [removeAlert] = useAlert((state) => [state.removeAlert]);

    const getAlertColour = (): string => {
        let colour = '';
        switch (alert.type) {
            case 'success':
                colour = 'green';
                break;
            case 'error':
                colour = 'red';
                break;
            case 'info':
                colour = 'blue';
                break;
        }

        return colour;
    };

    const alertColour = getAlertColour();

    return (
        <MantineAlert
            icon={<IconAlertCircle size="1rem" />}
            className={className}
            title={alert.title}
            color={alertColour}
            withCloseButton
            onClose={() => removeAlert(alert.id)}
        >
            {alert.message}
        </MantineAlert>
    );
}
