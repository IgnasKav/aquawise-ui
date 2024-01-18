'use client';

import useAlert from '../../stores/useAlert';
import { AlertComponent } from './Alert';

export function AlertList() {
    const [alerts] = useAlert((state) => [state.alerts, state.createAlert]);

    return (
        <div className="absolute right-10 bottom-10 w-96 z-[1000]">
            {alerts.map((alert) => (
                <AlertComponent key={alert.id} className="mt-2" alert={alert} />
            ))}
        </div>
    );
}
