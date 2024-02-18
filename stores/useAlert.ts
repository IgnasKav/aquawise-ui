import { create } from 'zustand';
import { produce } from 'immer';
import { AlertDto } from '../app/shared/components/alert/models/AlertDto';

interface AlertState {
    alerts: AlertDto[];
    createAlert: (alert: AlertDto) => void;
    removeAlert: (id: string) => void;
}

const useAlert = create<AlertState>((set) => ({
    alerts: [],
    createAlert: (alert: AlertDto) =>
        set(
            produce((state: AlertState) => {
                state.alerts.push(alert);
            }),
        ),
    removeAlert: (id: string) =>
        set(
            produce((state: AlertState) => {
                const index = state.alerts.findIndex(
                    (alert) => alert.id === id,
                );
                state.alerts.splice(index, 1);
            }),
        ),
}));

export default useAlert;
