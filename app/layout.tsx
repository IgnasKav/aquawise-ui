import { AlertList } from './shared/components/alert/AlertList';
import NavBar from './shared/components/nav-bar/NavBar';
import { SessionProvider } from '../utils/SessionProvider';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from './api/auth/[...nextauth]/route';
import ClientProviders from '../utils/ClientProviders';
import 'styles/global.css';
import { ThemeProvider } from 'utils/ThemeProvider';

type RootLayoutProps = {
    children: React.ReactNode;
};

const RootLayout = async ({ children }: RootLayoutProps) => {
    const session = await getServerSession(nextAuthOptions);

    return (
        <html lang="en" suppressHydrationWarning>
            <head></head>
            <body>
                <SessionProvider>
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
                </SessionProvider>
            </body>
        </html>
    );
};

export default RootLayout;
