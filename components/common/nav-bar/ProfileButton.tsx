import { useRouter } from 'next/router';
import { Avatar, Button, Divider, Group, Menu } from '@mantine/core';
import { AiFillCaretDown, AiOutlineEdit } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { User } from '../../../models/User';
import useAuth from '../../../stores/useAuth';

interface ProfileButtonProps {
    user: User;
}

const ProfileButton = ({ user }: ProfileButtonProps) => {
    const [logout] = useAuth((state) => [state.logout]);
    const router = useRouter();

    return (
        <Menu>
            <Menu.Target>
                <Button color="blue" size="lg" variant="subtle">
                    <Group>
                        <Avatar
                            variant="filled"
                            size="md"
                            color="teal"
                            radius="xl"
                        >
                            {user.firstName[0].toUpperCase() +
                                user.lastName[0].toUpperCase()}
                        </Avatar>
                        <AiFillCaretDown size={'10px'} />
                    </Group>
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>{user.email}</Menu.Label>
                <Menu.Item
                    icon={<AiOutlineEdit />}
                    onClick={() => router.push('/')}
                >
                    Edit profile
                </Menu.Item>
                <Divider />
                <Menu.Item
                    color={'red'}
                    icon={<FiLogOut />}
                    onClick={() => {
                        logout();
                        router.push('/');
                    }}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default ProfileButton;
