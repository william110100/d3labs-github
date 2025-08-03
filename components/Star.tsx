import { useGitHubStore } from '@/stores';
import { formatDate } from '@/utils/helpers';
import { Badge, Button, Card, Flex, Group, Text } from '@mantine/core';
import { IconChevronLeft, IconChevronRight, IconGitFork, IconPointFilled, IconStar } from '@tabler/icons-react';
import { Layout } from './Layout';

export const Star = () => {
  const { onNextPage, onPreviousPage, user } = useGitHubStore();
  const { edges, pageInfo } = user.starredRepositories;

  return (
    <Layout>
      <div className="flex flex-col gap-y-2 px-4 py-8 w-full">
        {edges?.map(({ node }) => (
          <Card className="bg-transparent flex flex-col justify-between px-3 py-2" key={node.id} radius="sm">
            <Flex direction="column">
              <Group>
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
              <Text c="#9198A1" className="text-xs" fw={500}>
                {formatDate(node.updatedAt)}
              </Text>
            </Group>
          </Card>
        ))}
        <Group justify="center">
          <Button
            className="hover:bg-transparent p-0 text-[#9198A1] text-sm"
            disabled={!pageInfo?.hasPreviousPage}
            leftSection={<IconChevronLeft color="#9198A1" size={12} />}
            onClick={onPreviousPage}
            variant="subtle">
            Previous
          </Button>
          <Button
            className="hover:bg-transparent p-0 text-[#9198A1] text-sm"
            disabled={!pageInfo?.hasNextPage}
            onClick={onNextPage}
            rightSection={<IconChevronRight color="#9198A1" size={12} />}
            variant="subtle">
            Next
          </Button>
        </Group>
      </div>
    </Layout>
  );
};
