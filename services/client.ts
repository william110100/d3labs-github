import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL });

export const createApolloClient = () => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        User: {
          fields: {
            repositories: {
              keyArgs: false,
              merge(_, incoming) {
                return incoming;
              },
            },
            starredRepositories: {
              keyArgs: false,
              merge(_, incoming) {
                return incoming;
              },
            },
          },
        },
        Viewer: {
          fields: {
            repositories: {
              keyArgs: false,
              merge(_, incoming) {
                return incoming;
              },
            },
            starredRepositories: {
              keyArgs: false,
              merge(_, incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
    link: authLink.concat(httpLink),
  });
};
