import useAlert from "../../stores/useAlert";
import {Alert} from "./alert";
import css from './alertList.module.scss';
import {AnimatePresence, motion} from "framer-motion"


export function AlertList() {
    const [alerts] = useAlert((state) => [state.alerts, state.createAlert]);

    return(
        <div className={`${css.alertListContainer}`}>
            <AnimatePresence initial={false}>
                {alerts.map(alert => (
                    <motion.div
                        key={alert.id}
                        layout
                        initial={{ opacity: 0, y: 50, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    >
                        <Alert  className={`${css.alertContainer}`} alert={alert}/>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
