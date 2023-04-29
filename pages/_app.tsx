import type {AppProps} from 'next/app'
import {useState} from "react";
import {Hydrate, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Head from 'next/head';
import {Button, MantineProvider} from '@mantine/core';
import '../styles/global.scss';
import useAlert from "../stores/useAlert";
import {Alert, AlertTypes} from "../components/alert/alert";
import { v4 as uuid } from 'uuid';


export default function App({Component, pageProps}: AppProps) {
    const [queryClient] = useState(() => new QueryClient())
    const [alerts, createAlert] = useAlert((state) => [state.alerts, state.createAlert]);

    const handleAlertCreation = () => {
        const alert: Alert = {
            id: uuid(),
            title: 'Hello World',
            message: 'Alerts are working',
            type: AlertTypes.success
        }

        createAlert(alert);
    }

    return (
        <>
            <Head>
                <title>Aquawise</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <QueryClientProvider client={queryClient}>
                <Hydrate>
                    <MantineProvider
                        withGlobalStyles
                        withNormalizeCSS
                        theme={{
                            colorScheme: 'light',
                        }}
                    >
                        <Component {...pageProps} />
                        <Button onClick={() => handleAlertCreation()}>Create alert</Button>
                        {alerts.map(alert => <Alert key={alert.id} alert={alert}/>)}
                    </MantineProvider>
                </Hydrate>
            </QueryClientProvider>
        </>
    )
}
