import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
// import { getCookie } from 'cookies-next';
// import { useEffect } from 'react';
// import { ThemeColors } from '../components/common/theme/ThemeColors';
// import useAuth from '../stores/useAuth';
import { ModalsProvider } from '@mantine/modals';
import { AlertList } from '../components/alert/AlertList';
import NavBar from '../components/common/nav-bar/NavBar';
import '@mantine/core/styles.css';
import { SessionProvider } from '../wrapped/SessionProvider';

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    // const pathName = usePathname();
    // const [user, getCurrent] = useAuth((state) => [
    //     state.user,
    //     state.getCurrent,
    // ]);
    // const jwt = getCookie('jwt');

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
                                <NavBar />
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
