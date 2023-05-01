import {useRouter} from "next/router";
import {Avatar, Button, Divider, Group, Menu, Modal} from "@mantine/core";
import {AiFillCaretDown, AiOutlineEdit} from "react-icons/ai";
import {FiLogOut} from "react-icons/fi";
import {User} from "../../../models/User";
import useAuth from "../../../stores/useAuth";
import {useState} from "react";
import {LoginForm} from "../../auth/loginForm";

interface ProfileMenuProps {
    user: User;
}

const ProfileMenu = ({ user }: ProfileMenuProps) => {
    const [logout] = useAuth(state => [state.logout])
    const router = useRouter();

    return (
        <Menu>
            <Menu.Target>
                <Button color="green" size='lg' variant="subtle">
                    <Group>
                        <Avatar size='md' color="cyan" radius="xl">
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

const AuthMenu = () => {
    const [loginModalOpened, setLoginModalOpened] = useState<boolean>(false);

    return (
        <>
            <Modal opened={loginModalOpened} onClose={() => setLoginModalOpened(false)} title="Welcome to Aquawise, login with">
                <LoginForm/>
            </Modal>
            <Menu>
                <Menu.Target>
                    <Button color="green" size='lg' variant="subtle">
                        <Group>
                            <Avatar size='md' color="cyan" radius="xl"/>
                            <AiFillCaretDown size={'10px'} />
                        </Group>
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item
                        icon={<AiOutlineEdit />}
                        onClick={() => setLoginModalOpened(true)}
                    >
                        Login
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
};

export const NavBarMenu = () => {
    const [user] = useAuth(state => [state.user])

    return(
        <>
            {user ? <ProfileMenu user={user}/> : <AuthMenu/>}
        </>
    )
}
