import {Alert as MantineAlert} from '@mantine/core';
import {IconAlertCircle} from "@tabler/icons";
import {motion} from 'framer-motion';
import { Alert, AlertType } from '../../models/Alert';
import useAlert from "../../stores/useAlert";

interface Props {
    alert: Alert,
    className: string;

}

export function AlertComponent({alert, className}: Props) {
    const [removeAlert] = useAlert((state) => [state.removeAlert]);

    const getAlertColour = (): string => {
        let colour = '';
        switch (alert.type) {
            case AlertType.success:
                colour = 'green';
                break;
            case AlertType.error:
                colour = 'red';
                break;
            case AlertType.info:
                colour = 'blue';
                break;
        }

        return colour;
    }

    const alertColour = getAlertColour();

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
                color={alertColour}
                withCloseButton
                onClose={() => removeAlert(alert.id)}
            >
                {alert.message}
            </MantineAlert>
        </motion.div>
    );
}
