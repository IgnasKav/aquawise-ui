import { Center, Text } from '@mantine/core';

const Home = () => {
    return (
        <Center>
            <Text
                fw={700}
                size={100}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            >
                Welcome to Aquawise
            </Text>
        </Center>
    );
};

export default Home;
