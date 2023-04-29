import {Alert as MantineAlert} from '@mantine/core';
import {IconAlertCircle} from "@tabler/icons";
import useAlert from "../../stores/useAlert";

export interface Alert {
    id: string;
    type: AlertTypes
    message: string;
    title: string;
}
export enum AlertTypes {
    'error',
    'success',
    'info'
}

interface Props {
    alert: Alert,
    className: string;

}

export function Alert({alert, className}: Props) {
    const [removeAlert] = useAlert((state) => [state.removeAlert]);

    return (
        <>
            <MantineAlert
                icon={<IconAlertCircle size="1rem" />}
                className={className}
                title={alert.title}
                color="red"
                withCloseButton
                onClose={() => removeAlert(alert.id)}
            >
                {alert.message}
            </MantineAlert>
        </>
    );
}
