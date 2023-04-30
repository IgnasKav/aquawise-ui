import { FiLogOut } from 'react-icons/fi';
import {
    Button,
    Card,
    Container,
    Group,
    MediaQuery,
    Burger,
    Stack,
    Menu,
    Avatar,
    Divider,
    MantineSize, MantineNumberSize
} from "@mantine/core";
import React, { useState } from 'react';
import { AiFillCaretDown, AiOutlineEdit, AiOutlineHome } from 'react-icons/ai';
import { useRouter } from "next/router";
import useAuth from "../../stores/useAuth";
import { User } from "../../models/User";

const NavButton = ({
    to,
    color,
    title,
    icon = '',
    size = 'lg',
}: {
    to: string;
    color: string;
    title: string;
    icon?: React.ReactNode;
    size?: MantineSize;
}) => {
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

const NavHoverMenu = ({ user, logout, buttonSize = 'lg', avatarSize = 'md' }: {user: User, logout: () => void, buttonSize?: MantineSize, avatarSize?: MantineNumberSize,}) => {
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
        </Menu>
    );
};

const NavBar = () => {
    const { user, logout } = useAuth();
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Container mx="auto" py={20} px={20} style={{ maxWidth: '1000px', zIndex: '2' }}>
                <Card shadow="md" radius="lg" p="md" withBorder>
                    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                        <Group position="apart">
                            <NavButton to="/" color="blue" title="Home" icon={<AiOutlineHome />} />
                            {!user ? (
                                <Group>
                                    <NavButton to="/auth/login" color="blue" title="Login" />
                                    <NavButton to="/auth/register" color="blue" title="Register" />
                                </Group>
                            ) : (
                                <Group>
                                    <NavHoverMenu user={user} logout={logout} />
                                </Group>
                            )}
                        </Group>
                    </MediaQuery>
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <Stack>
                            <Group position="apart">
                                <Burger size={'xs'} opened={opened} onClick={() => setOpened((o) => !o)} />
                                {!user ? (
                                    <Group>
                                        <NavButton to="/auth/login" color="blue" title="Login" />
                                        <NavButton to="/auth/register" color="blue" title="Register" />
                                    </Group>
                                ) : (
                                    <Group>
                                        <NavHoverMenu avatarSize={'sm'} buttonSize={'sm'} user={user} logout={logout} />
                                        {opened && (
                                            <Stack>
                                                <NavButton size={'sm'} to="/" color="blue" title="Home" icon={<AiOutlineHome />} />
                                            </Stack>
                                        )}
                                    </Group>
                                )}
                            </Group>
                        </Stack>
                    </MediaQuery>
                </Card>
            </Container>
        </>
    );
};

export default NavBar;
