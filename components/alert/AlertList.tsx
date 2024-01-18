'use client';

import useAlert from '../../stores/useAlert';
import { AlertComponent } from './Alert';
import css from './alert-list.module.scss';

export function AlertList() {
    const [alerts] = useAlert((state) => [state.alerts, state.createAlert]);

    return (
        <div className={`${css.alertListContainer}`}>
            {alerts.map((alert) => (
                <AlertComponent
                    key={alert.id}
                    className={`${css.alertContainer}`}
                    alert={alert}
                />
            ))}
        </div>
    );
}
