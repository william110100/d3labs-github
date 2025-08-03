interface PageInfo {
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
}

export interface Repository {
  databaseId: number;
  description: string;
  forkCount: number;
  folks: {
    totalCount: number;
  };
  id: string;
  name: string;
  owner: {
    login: string;
  };
  primaryLanguage: {
    color: string;
    id: string;
    name: string;
  };
  stargazerCount: number;
  stargazers: {
    totalCount: number;
  };
  updatedAt: string;
  url: string;
  viewerHasStarred: boolean;
  viewerSubscription: 'IGNORED' | 'SUBSCRIBED' | 'UNSUBSCRIBED';
  watchers: {
    totalCount: number;
  };
}

export interface User {
  avatarUrl: string;
  bio: string;
  company: string;
  databaseId: number;
  email: string;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  id: string;
  location: string;
  login: string;
  name: string;
  repositories: {
    edges: Array<{
      node: Repository;
    }>;
    pageInfo: PageInfo;
    totalCount: number;
  };
  starredRepositories: {
    edges: Array<{
      node: Repository;
    }>;
    pageInfo: PageInfo;
    totalCount: number;
  };
  updatedAt: string;
  watching: {
    totalCount: number;
  };
}
