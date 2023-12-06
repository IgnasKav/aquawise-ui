import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import Head from 'next/head';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import '../styles/global.scss';
import { AlertList } from '../components/alert/AlertList';
import NavBar from '../components/common/nav-bar/NavBar';
import { getCookie } from 'cookies-next';
import useAuth from '../stores/useAuth';
import { useRouter } from 'next/router';
import { ModalsProvider } from '@mantine/modals';
import { ThemeColors } from '../components/common/theme/ThemeColors';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [user, getCurrent] = useAuth((state) => [
        state.user,
        state.getCurrent,
    ]);
    const jwt = getCookie('jwt');
    const [queryClient] = useState(() => new QueryClient());

    const [theme, setTheme] = useState<MantineThemeOverride>({
        colorScheme: 'light',
        primaryColor: 'blue',
    });

    useEffect(() => {
        const brandColorHex = user?.company?.brandColor;

        if (!brandColorHex) return;

        const brandColorName = ThemeColors.getByHex(brandColorHex);

        if (!brandColorName) return;

        setTheme({ primaryColor: brandColorName });
    }, [user?.company?.brandColor]);

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
                        withCSSVariables
                        withNormalizeCSS
                        theme={theme}
                    >
                        <ModalsProvider>
                            <div className="appContainer">
                                {router.pathname != '/auth/register' && (
                                    <NavBar />
                                )}
                                <Component {...pageProps} />
                                <AlertList />
                            </div>
                        </ModalsProvider>
                    </MantineProvider>
                </Hydrate>
            </QueryClientProvider>
        </>
    );
}
