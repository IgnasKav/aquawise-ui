'use client';

import { AnimatePresence, motion } from 'framer-motion';
import useAlert from '../../../../stores/useAlert';
import { AlertComponent } from './Alert';
import { ReactNode } from 'react';

export function AlertList() {
    const [alerts] = useAlert((state) => [state.alerts, state.createAlert]);

    return (
        <div className="absolute right-10 bottom-10 w-96 z-[1000]">
            <AnimatePresence>
                {alerts.map((alert) => (
                    <Animation key={alert.id}>
                        <AlertComponent className="mt-2" alert={alert} />
                    </Animation>
                ))}
            </AnimatePresence>
        </div>
    );
}

const Animation = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.3 },
            }}
            exit={{ scale: 0, transition: { duration: 0.1 } }}
        >
            {children}
        </motion.div>
    );
};
