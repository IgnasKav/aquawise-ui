import {
    Avatar,
    Button,
    Divider,
    Group,
    Menu,
    Stack,
    Text,
} from '@mantine/core';
import { AiFillCaretDown } from 'react-icons/ai';
import { User } from '../../../models/User';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface ProfileButtonProps {
    user: User;
}

const ProfileButton = ({ user }: ProfileButtonProps) => {
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
                <Stack px={12} py={10}>
                    <Text>Signed in as</Text>
                    <Text fw={700}>{user.email}</Text>
                </Stack>

                <Divider />
                <Menu.Item onClick={() => router.push('/')}>
                    Your profile
                </Menu.Item>
                <Menu.Item onClick={() => router.push('/company')}>
                    Your company
                </Menu.Item>
                <Divider />
                <Menu.Item
                    color={'red'}
                    onClick={() => {
                        signOut({ redirect: false });
                    }}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default ProfileButton;
