import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { AlertList } from '../components/alert/AlertList';
import NavBar from '../components/common/nav-bar/NavBar';
import '@mantine/core/styles.css';
import { SessionProvider } from '../wrapped/SessionProvider';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from './api/auth/[...nextauth]/route';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(nextAuthOptions);
    const theme = createTheme({});

    // const { setColorScheme } = useMantineColorScheme();
    // setColorScheme('dark');

    // const [theme, setTheme] = useState<MantineThemeOverride>({
    //     colorScheme: 'light',
    //     primaryColor: 'blue',
    // });

    // useEffect(() => {
    //     const brandColorHex = user?.company?.brandColor;

    //     if (!brandColorHex) return;

    //     const brandColorName = ThemeColors.getByHex(brandColorHex);

    //     if (!brandColorName) return;

    //     // setTheme({ primaryColor: brandColorName });
    // }, [user?.company?.brandColor]);

    // useEffect(() => {
    //     getCurrent();
    // }, [jwt]);

    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <SessionProvider>
                    <MantineProvider theme={theme}>
                        <ModalsProvider>
                            <div className="appContainer">
                                <NavBar session={session} />
                                {children}
                                <AlertList />
                            </div>
                        </ModalsProvider>
                    </MantineProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
