import { Button, Modal } from '@mantine/core';
import { useState } from 'react';
import { UserInviteForm } from './UserInviteForm';

export const UserInviteButton = () => {
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    return (
        <>
            <Button onClick={() => setModalOpened(true)}>Invite</Button>
            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title="Invite user"
            >
                <UserInviteForm />
            </Modal>
        </>
    );
};
