import { useGitHubStore } from '@/stores';
import { Badge, Button, Card, Flex, Group, Text } from '@mantine/core';
import { IconGitFork, IconPointFilled, IconStar } from '@tabler/icons-react';
import { Layout } from './Layout';

export const Overview = () => {
  const { user } = useGitHubStore();

  return (
    <Layout>
      <div className="flex flex-col gap-y-2 px-4 py-8 w-full">
        <Text c="white" className="text-lg" fw={500}>
          Popular repositories
        </Text>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          {user?.repositories?.edges?.slice(0, 6).map(({ node }) => (
            <Card
              key={node.id}
              className="bg-transparent border-[#2E3138] border-solid flex flex-col justify-between px-3 py-2"
              radius="sm"
              withBorder>
              <Flex direction="column">
                <Group justify="space-between" m={0} p={0}>
                  <Button className="font-extrabold p-0" variant="subtle">
                    {node.name}
                  </Button>
                  <Badge
                    className="border-[#2E3138] border-solid capitalize px-1.5 rounded-lg text-[#9198A1]"
                    color="transparent">
                    Public
                  </Badge>
                </Group>
                <Text c="#9198A1" className="text-xs">
                  {node.description}
                </Text>
              </Flex>
              <Group>
                <Flex align="center" direction="row">
                  <IconPointFilled color={node.primaryLanguage?.color} size={24} />
                  <Text c="#9198A1" className="text-xs">
                    {node.primaryLanguage?.name}
                  </Text>
                </Flex>
                <Button
                  className="hover:bg-transparent p-0 text-[#9198A1] text-sm"
                  leftSection={<IconStar className="-mr-2" color="#9198A1" size={12} />}
                  variant="subtle">
                  {node.stargazers?.totalCount}
                </Button>
                <Button
                  className="hover:bg-transparent p-0 text-[#9198A1] text-sm"
                  leftSection={<IconGitFork className="-mr-2" color="#9198A1" size={12} />}
                  variant="subtle">
                  {node.forkCount}
                </Button>
              </Group>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};
