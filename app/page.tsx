'use client';

import { Header, TabMenu } from '@/components';
import { GET_USER, VIEWER } from '@/services/queries';
import { useGitHubStore } from '@/stores';
import { useLazyQuery, useQuery } from '@apollo/client';
import { LoadingOverlay, Space } from '@mantine/core';
import { NextPage } from 'next';
import { useCallback, useEffect } from 'react';

const Page: NextPage = () => {
  const { activeMenu, username, setOnNextPage, setOnPreviousPage, setUser } = useGitHubStore();
  const {
    data: viewerData,
    fetchMore: fetchMoreViewer,
    loading: viewerLoading,
  } = useQuery(VIEWER, {
    skip: !!username,
    variables: { first: 10 },
  });
  const [getUser, { data: userData, fetchMore: fetchMoreUser, loading: userLoading }] = useLazyQuery(GET_USER);

  const onPaginate = useCallback(
    async (direction: 'next' | 'previous') => {
      const fetchMore = !username ? fetchMoreViewer : fetchMoreUser;
      const data = !username ? viewerData : userData;

      if (!data || !fetchMore) return;

      const profile = !username ? data.viewer : data.user;
      const connection = activeMenu === 'repository' ? profile.repositories : profile.starredRepositories;
      const { pageInfo } = connection;
      const isNext = direction === 'next';
      const hasNextPage = isNext ? pageInfo.hasNextPage : pageInfo.hasPreviousPage;

      if (hasNextPage) {
        await fetchMore({
          variables: {
            after: pageInfo.endCursor,
            before: undefined,
            first: 10,
            last: undefined,
          },
        });
      } else if (!hasNextPage) {
        await fetchMore({
          variables: {
            after: undefined,
            before: pageInfo.startCursor,
            first: undefined,
            last: 10,
          },
        });
      }
    },
    [activeMenu, fetchMoreViewer, fetchMoreUser, userData, username, viewerData],
  );

  const onNextPage = useCallback(() => onPaginate('next'), [onPaginate]);
  const onPreviousPage = useCallback(() => onPaginate('previous'), [onPaginate]);

  useEffect(() => {
    document.title = `D3Labs GitHub - ${username || 'Home'}`;
    if (username !== '') {
      getUser({ variables: { username, first: 10 } });
    }
  }, [getUser, username]);

  useEffect(() => {
    setOnNextPage(onNextPage);
    setOnPreviousPage(onPreviousPage);
  }, [onNextPage, onPreviousPage, setOnNextPage, setOnPreviousPage]);

  useEffect(() => {
    if (viewerData?.viewer) {
      setUser(viewerData.viewer);
    } else if (userData?.user) {
      setUser(userData.user);
    }
  }, [setUser, userData, viewerData]);

  return (
    <main className="bg-[#0D1117] min-h-dvh min-w-full">
      <Header />
      <Space h="lg" />
      {userLoading || viewerLoading ? <LoadingOverlay visible /> : <TabMenu />}
    </main>
  );
};

export default Page;
