import { gql } from '@apollo/client';

const REPOSITORY_DETAILS_FRAGMENT = gql`
  fragment RepositoryDetails on Repository {
    databaseId
    description
    forkCount
    id
    name
    owner {
      login
    }
    primaryLanguage {
      color
      id
      name
    }
    stargazers {
      totalCount
    }
    updatedAt
    url
    viewerHasStarred
    viewerSubscription
    watchers {
      totalCount
    }
  }
`;

const PAGE_INFO_FRAGMENT = gql`
  fragment PageInfoDetails on PageInfo {
    endCursor
    hasPreviousPage
    hasNextPage
    startCursor
  }
`;

const REPOSITORY_CONNECTION_FRAGMENT = gql`
  fragment RepositoryConnection on RepositoryConnection {
    edges {
      node {
        ...RepositoryDetails
      }
    }
    pageInfo {
      ...PageInfoDetails
    }
    totalCount
  }
  ${REPOSITORY_DETAILS_FRAGMENT}
  ${PAGE_INFO_FRAGMENT}
`;

const STARRED_REPOSITORY_CONNECTION_FRAGMENT = gql`
  fragment StarredRepositoryConnection on StarredRepositoryConnection {
    edges {
      node {
        ...RepositoryDetails
      }
    }
    pageInfo {
      ...PageInfoDetails
    }
    totalCount
  }
  ${REPOSITORY_DETAILS_FRAGMENT}
  ${PAGE_INFO_FRAGMENT}
`;

const USER_PROFILE_FRAGMENT = gql`
  fragment UserProfile on User {
    avatarUrl
    bio
    company
    databaseId
    email
    followers {
      totalCount
    }
    following {
      totalCount
    }
    id
    location
    login
    name
    repositories(
      after: $after
      before: $before
      first: $first
      last: $last
      orderBy: { direction: DESC, field: UPDATED_AT }
    ) {
      ...RepositoryConnection
    }
    starredRepositories(
      after: $after
      before: $before
      first: $first
      last: $last
      orderBy: { direction: DESC, field: STARRED_AT }
    ) {
      ...StarredRepositoryConnection
    }
    updatedAt
    watching {
      totalCount
    }
  }
  ${REPOSITORY_CONNECTION_FRAGMENT}
  ${STARRED_REPOSITORY_CONNECTION_FRAGMENT}
`;

export const GET_USER = gql`
  query GetUser($username: String!, $after: String, $before: String, $first: Int, $last: Int) {
    user(login: $username) {
      ...UserProfile
    }
  }
  ${USER_PROFILE_FRAGMENT}
`;

export const VIEWER = gql`
  query Viewer($after: String, $before: String, $first: Int, $last: Int) {
    viewer {
      ...UserProfile
    }
  }
  ${USER_PROFILE_FRAGMENT}
`;
