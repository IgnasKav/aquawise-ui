import useAlert from "../../stores/useAlert";
import {AlertComponent} from "./alert";
import css from './alertList.module.scss';
import {AnimatePresence} from "framer-motion"


export function AlertList() {
    const [alerts] = useAlert((state) => [state.alerts, state.createAlert]);

    return(
        <div className={`${css.alertListContainer}`}>
            <AnimatePresence initial={false}>
                {alerts.map(alert =>
                    <AlertComponent
                        key={alert.id}
                        className={`${css.alertContainer}`}
                        alert={alert}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
