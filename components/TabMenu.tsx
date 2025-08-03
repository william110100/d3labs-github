import { Overview, Repository, Star } from '@/components';
import { useGitHubStore } from '@/stores';
import { Badge, Tabs } from '@mantine/core';
import { IconBook, IconBookmark, IconStar } from '@tabler/icons-react';

export const TabMenu = () => {
  const { setActiveMenu, user } = useGitHubStore();

  return (
    <Tabs
      color="#F78166"
      defaultValue="overview"
      onChange={(value) => setActiveMenu(value as 'overview' | 'repository' | 'star')}>
      <Tabs.List className="border-b-black border-solid px-4">
        <Tabs.Tab
          className="px-4 py-2 text-white hover:bg-[#2E3138]"
          leftSection={<IconBook size={20} />}
          value="overview">
          Overview
        </Tabs.Tab>
        <Tabs.Tab
          className="px-4 py-2 text-white hover:bg-[#2E3138]"
          leftSection={<IconBookmark size={20} />}
          rightSection={
            user?.repositories?.totalCount > 0 ? (
              <Badge className="border-[#2E3138] border-solid px-1.5 rounded-lg text-white" color="transparent">
                {user?.repositories?.totalCount}
              </Badge>
            ) : null
          }
          value="repository">
          Repositories
        </Tabs.Tab>
        <Tabs.Tab
          className="px-4 py-2 text-white hover:bg-[#2E3138]"
          leftSection={<IconStar size={20} />}
          rightSection={
            user?.starredRepositories?.totalCount > 0 ? (
              <Badge className="border-[#2E3138] border-solid px-1.5 rounded-lg text-white" color="transparent">
                {user?.starredRepositories?.totalCount}
              </Badge>
            ) : null
          }
          value="star">
          Star
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        <Overview />
      </Tabs.Panel>
      <Tabs.Panel value="repository">
        <Repository />
      </Tabs.Panel>
      <Tabs.Panel value="star">
        <Star />
      </Tabs.Panel>
    </Tabs>
  );
};
