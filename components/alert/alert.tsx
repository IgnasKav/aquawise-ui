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
    alert: Alert
}

export function Alert({alert}: Props) {
    const [removeAlert] = useAlert((state) => [state.removeAlert]);

    return (
        <>
            <MantineAlert
                icon={<IconAlertCircle size="1rem" />}
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
