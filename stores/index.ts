import { User } from '@/models';
import { create } from 'zustand';

interface GitHubStore {
  activeMenu: 'overview' | 'repository' | 'star';
  onNextPage: (() => Promise<void>) | undefined;
  onPreviousPage: (() => Promise<void>) | undefined;
  user: User;
  username: string;
  setActiveMenu: (menu: 'overview' | 'repository' | 'star') => void;
  setOnNextPage: (onNextPage: (() => Promise<void>) | undefined) => void;
  setOnPreviousPage: (onPreviousPage: (() => Promise<void>) | undefined) => void;
  setUsername: (username: string) => void;
  setUser: (user: User) => void;
}

export const useGitHubStore = create<GitHubStore>((set) => ({
  activeMenu: 'overview',
  onNextPage: undefined,
  onPreviousPage: undefined,
  user: {
    avatarUrl: '',
    bio: '',
    company: '',
    databaseId: 0,
    email: '',
    followers: { totalCount: 0 },
    following: { totalCount: 0 },
    id: '',
    location: '',
    login: '',
    name: '',
    repositories: {
      edges: [],
      pageInfo: { endCursor: '', hasPreviousPage: false, hasNextPage: false, startCursor: '' },
      totalCount: 0,
    },
    starredRepositories: {
      edges: [],
      pageInfo: { endCursor: '', hasPreviousPage: false, hasNextPage: false, startCursor: '' },
      totalCount: 0,
    },
    updatedAt: '',
    watching: { totalCount: 0 },
  },
  username: '',
  setActiveMenu: (menu) => set({ activeMenu: menu }),
  setOnNextPage: (onNextPage) => set({ onNextPage }),
  setOnPreviousPage: (onPreviousPage) => set({ onPreviousPage }),
  setUser: (user: User) => set({ user }),
  setUsername: (username: string) => set({ username }),
}));
