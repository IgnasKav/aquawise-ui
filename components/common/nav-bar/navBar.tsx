import {Button, Card, Group, MantineSize} from "@mantine/core";
import {AiOutlineHome} from 'react-icons/ai';
import {useRouter} from "next/router";
import useAuth from "../../../stores/useAuth";
import css from './navBar.module.scss';
import NavBarLoader from "./navBarLoader";
import {NavBarMenu} from "./navBarMenu";

interface NavButtonProps {
    to: string;
    color: string;
    title: string;
    icon?: React.ReactNode;
    size?: MantineSize;
}

const NavButton = ({
    to,
    color,
    title,
    icon = '',
    size = 'lg',
}: NavButtonProps) => {
    const router = useRouter();

    return (
        <Button
            variant={router.pathname == to ? 'light' : 'subtle'}
            color={color}
            size={size}
            leftIcon={icon}
            onClick={() => router.push(to)}
        >
            {title}
        </Button>
    );
};

const NavBar = () => {
    const [isLoading]  = useAuth((state) => [state.isLoading]);

    if(isLoading) {
        return(
            <div className={css.navContainer}>
                <NavBarLoader/>
            </div>
        )
    }

    return (
        <div className={css.navContainer}>
            <Card className={css.navCard} shadow="md" radius="lg" p="md" withBorder>
                <Group position="apart">
                    <NavButton to="/" color="blue" title="Home" icon={<AiOutlineHome />} />
                    <Group>
                        <NavBarMenu />
                    </Group>
                </Group>
            </Card>
        </div>
    );
};

export default NavBar;
