import { create } from 'zustand';
import { produce } from 'immer';
import { AlertDto } from '../components/alert/models/AlertDto';
import { ApiError } from 'api/models/ApiError';

interface AlertState {
    alerts: AlertDto[];
    createAlertFromApiError: (error: ApiError) => void;
    createAlert: (alert: AlertDto) => void;
    removeAlert: (id: string) => void;
}

const useAlert = create<AlertState>((set) => ({
    alerts: [],
    createAlertFromApiError: (error: ApiError) =>
        set(
            produce((state: AlertState) => {
                state.alerts.push(
                    new AlertDto({
                        type: 'error',
                        title: 'Error',
                        message: error.message,
                    }),
                );
            }),
        ),
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
