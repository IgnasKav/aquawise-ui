import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { AlertList } from './shared/components/alert/AlertList';
import NavBar from './shared/components/nav-bar/NavBar';
import '@mantine/core/styles.css';
import { SessionProvider } from '../wrapped/SessionProvider';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from './api/auth/[...nextauth]/route';
import ClientProviders from '../utils/ClientProviders';
import 'styles/global.css';
import { ThemeProvider } from 'utils/ThemeProvider';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(nextAuthOptions);
    const theme = createTheme({});

    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <SessionProvider>
                    <MantineProvider theme={theme}>
                        <ModalsProvider>
                            <ClientProviders>
                                <ThemeProvider
                                    attribute="class"
                                    defaultTheme="system"
                                    enableSystem
                                    disableTransitionOnChange
                                >
                                    <div className="relative h-screen max-w-screen-2xl mx-auto px-8">
                                        <NavBar session={session} />
                                        {children}
                                    </div>
                                    <AlertList />
                                </ThemeProvider>
                            </ClientProviders>
                        </ModalsProvider>
                    </MantineProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
