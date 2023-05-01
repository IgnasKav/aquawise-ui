import { Button, Card, Flex, Group, Stack } from "@mantine/core";

const Warehouse = () => {
    return(
        <Card shadow="md" radius="md" p="xl" withBorder>
            <Flex justify="flex-end"
                align="center">
                <Button>
              Add new
                </Button>
            </Flex>
            <Stack>
                <Group>

                </Group>
            </Stack>
        </Card>
    )
}

export default Warehouse;
