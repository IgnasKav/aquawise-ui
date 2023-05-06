import { Button, Group, Modal, Stack, Text } from '@mantine/core';

interface ConfirmModalProps {
    opened: boolean;
    text: string;
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmModal = ({
    opened,
    text,
    onConfirm,
    onClose,
}: ConfirmModalProps) => {
    return (
        <Modal opened={opened} onClose={() => onClose()} title="Are you sure?">
            <Stack>
                <Text>{text}</Text>
                <Group>
                    <Button
                        onClick={() => {
                            onConfirm();
                        }}
                    >
                        Ok
                    </Button>
                    <Button color="gray" onClick={() => onClose()}>
                        Cancel
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};

export default ConfirmModal;
