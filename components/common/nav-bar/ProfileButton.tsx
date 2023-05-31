import { useRouter } from 'next/router';
import {
    Avatar,
    Button,
    Divider,
    Group,
    Menu,
    Stack,
    Text,
} from '@mantine/core';
import { AiFillCaretDown, AiOutlineUser } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { User } from '../../../models/User';
import useAuth from '../../../stores/useAuth';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';

interface ProfileButtonProps {
    user: User;
}

const ProfileButton = ({ user }: ProfileButtonProps) => {
    const [logout] = useAuth((state) => [state.logout]);
    const router = useRouter();

    return (
        <Menu>
            <Menu.Target>
                <Button size="lg" variant="subtle">
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
                <Stack spacing={0} px={12} py={10}>
                    <Text>Signed in as</Text>
                    <Text fw={700}>{user.email}</Text>
                </Stack>

                <Divider />
                <Menu.Item
                    icon={<AiOutlineUser />}
                    onClick={() => router.push('/')}
                >
                    Your profile
                </Menu.Item>
                <Menu.Item
                    icon={<HiOutlineOfficeBuilding />}
                    onClick={() => router.push('/company')}
                >
                    Your company
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
