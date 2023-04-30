import {create} from "zustand";
import {produce} from "immer";
import {Alert} from "../models/Alert";

interface AlertState {
    alerts: Alert[];
    createAlert: (alert: Alert) => void;
    removeAlert: (id: string) => void;
}

const useAlert = create<AlertState>((set) => ({
    alerts: [],
    createAlert: (alert: Alert) => set(
        produce((state: AlertState) => {
            state.alerts.push(alert);
        })
    ),
    removeAlert: (id: string) => set(
        produce((state: AlertState) => {
            const index = state.alerts.findIndex(alert => alert.id === id);
            state.alerts.splice(index, 1);
        })
    )
}))

export default useAlert;
