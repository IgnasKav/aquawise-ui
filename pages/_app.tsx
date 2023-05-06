import type {AppProps} from 'next/app';
import {useEffect, useState} from 'react';
import {Hydrate, QueryClient, QueryClientProvider,} from '@tanstack/react-query';
import Head from 'next/head';
import {MantineProvider} from '@mantine/core';
import '../styles/global.scss';
import {AlertList} from '../components/alert/AlertList';
import NavBar from '../components/common/nav-bar/NavBar';
import {getCookie} from 'cookies-next';
import useAuth from '../stores/useAuth';
import {useRouter} from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [getCurrent] = useAuth((state) => [state.getCurrent]);
    const jwt = getCookie('jwt');
    const [queryClient] = useState(() => new QueryClient());

    useEffect(() => {
        getCurrent();
    }, [jwt]);

    return (
        <>
            <Head>
                <title>Aquawise</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
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
                        <div className="bg-image">
                            {router.pathname != '/auth/register' && <NavBar />}
                            <Component {...pageProps} />
                            <AlertList />
                        </div>
                    </MantineProvider>
                </Hydrate>
            </QueryClientProvider>
        </>
    );
}
