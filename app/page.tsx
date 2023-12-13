import { Center, Text } from '@mantine/core';

export default async function HomePage() {
    return (
        <Center>
            <Text
                fw={700}
                size="xl"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            >
                Welcome to Aquawise
            </Text>
        </Center>
    );
}
