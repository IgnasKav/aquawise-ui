import {FiLogOut} from 'react-icons/fi';
import {Avatar, Button, Card, Divider, Group, MantineNumberSize, MantineSize, Menu} from "@mantine/core";
import {AiFillCaretDown, AiOutlineEdit, AiOutlineHome} from 'react-icons/ai';
import {useRouter} from "next/router";
import useAuth from "../../../stores/useAuth";
import {User} from "../../../models/User";
import css from './navBar.module.scss';
import NavBarLoader from "./NavBarLoader";

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

interface ProfileMenuProps {
    user: User;
    logout: () => void;
    buttonSize?: MantineSize;
    avatarSize?: MantineNumberSize;
}

const ProfileMenu = ({ user, logout, buttonSize = 'lg', avatarSize = 'md' }: ProfileMenuProps) => {
    const router = useRouter();

    return (
        <Menu>
            <Menu.Target>
                <Button color="green" size={buttonSize} variant="subtle">
                    <Group>
                        <Avatar size={avatarSize} color="cyan" radius="xl">
                            {user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
                        </Avatar>
                        <AiFillCaretDown size={'10px'} />
                    </Group>
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>{user.email}</Menu.Label>
                <Menu.Item
                    icon={<AiOutlineEdit />}
                    onClick={() =>
                        router.push('/')
                    }
                >
                    Edit profile
                </Menu.Item>
                <Divider />
                <Menu.Item
                    color={'red'}
                    icon={<FiLogOut />}
                    onClick={() => {
                        logout();
                    }}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

const NavBar = () => {
    const [user, logout, isLoading]  = useAuth((state) => [state.user, state.logout, state.isLoading]);

    if(isLoading) {
        return(
            <div className={css.navContainer}>
                <NavBarLoader/>
            </div>
        )
    }

    if(!user) {
        return (<></>);
    }

    return (
        <div className={css.navContainer}>
            <Card className={css.navCard} shadow="md" radius="lg" p="md" withBorder>
                <Group position="apart">
                    <NavButton to="/" color="blue" title="Home" icon={<AiOutlineHome />} />
                    <Group>
                        <ProfileMenu user={user} logout={logout} />
                    </Group>
                </Group>
            </Card>
        </div>
    );
};

export default NavBar;
