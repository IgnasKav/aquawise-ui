import {Alert as MantineAlert} from '@mantine/core';
import {IconAlertCircle} from "@tabler/icons";
import {motion} from 'framer-motion';
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
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        >
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
        </motion.div>
    );
}
