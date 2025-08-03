import { useGitHubStore } from '@/stores';
import { debounce } from '@/utils/helpers';
import { Input, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export const Header = () => {
  const { setUsername } = useGitHubStore();

  return (
    <header className="bg-[#2E3138] flex h-16 items-center justify-between px-8 py-4 sticky top-0 z-10">
      <Text c="white" className="text-3xl" fw={700}>
        GitHub
      </Text>
      <Input
        classNames={{ wrapper: 'md:w-1/3' }}
        leftSection={<IconSearch color="#9198A1" />}
        onChange={(event) => debounce(() => setUsername(event?.target?.value), 1000)}
        placeholder="Search GitHub User"
        radius="lg"
        size="md"
        type="text"
      />
    </header>
  );
};
