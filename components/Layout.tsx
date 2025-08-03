import { useGitHubStore } from '@/stores';
import { Button, Flex, Image, Space, Text } from '@mantine/core';
import { IconBuilding, IconMapPin, IconPointFilled, IconUsers } from '@tabler/icons-react';
import { FC, ReactNode } from 'react';

interface ILayoutProps {
  children: ReactNode;
}

export const Layout: FC<ILayoutProps> = (props: ILayoutProps) => {
  const { children } = props;
  const { user } = useGitHubStore();

  return (
    <div className="flex flex-col gap-4 max-w-[1200px] mx-auto md:flex-row">
      <div className="flex flex-col justify-center px-4 py-8 w-[400px] md:flex-row md:gap-x-8">
        <Flex direction="column" p={6}>
          <Image
            alt={user?.name}
            className="h-[60px] rounded-full w-[60px] md:h-[200px] md:w-[200px] lg:h-[250px] lg:w-[250px]"
            src={user?.avatarUrl}
          />
          <Space h="md" />
          <Flex direction="column">
            <Text className="text-2xl" c="white" fw={700}>
              {user?.name}
            </Text>
            <Text className="text-lg" c="#9198A1" fw={500}>
              {user?.login}
            </Text>
            <Space h="md" />
            <Text className="text-md" c="white" fw={500}>
              {user?.bio}
            </Text>
            <Space h="md" />
            <div className="flex gap-x-0.5 items-center">
              <Button
                className="hover:bg-transparent p-0 text-white"
                leftSection={<IconUsers className="-mr-2" color="#9198A1" size={14} />}
                variant="subtle">
                {user?.followers?.totalCount} followers
              </Button>
              <Button
                className="hover:bg-transparent p-0 text-white"
                leftSection={<IconPointFilled className="-mr-2" color="#9198A1" size={10} />}
                variant="subtle">
                {user?.following?.totalCount} following
              </Button>
            </div>
            <Flex align="flex-start" direction="column">
              {user?.company && (
                <Button
                  className="hover:bg-transparent p-0 text-white"
                  variant="subtle"
                  leftSection={<IconBuilding className="-mr-1" color="#9198A1" size={16} />}>
                  {user?.company}
                </Button>
              )}
              {user?.location && (
                <Button
                  className="hover:bg-transparent p-0 text-white"
                  variant="subtle"
                  leftSection={<IconMapPin className="-mr-1" color="#9198A1" size={16} />}>
                  {user?.location}
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </div>
      {children}
    </div>
  );
};
