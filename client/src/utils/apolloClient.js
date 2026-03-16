import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: {
          keyArgs: ['orderBy', 'orderDirection', 'searchKeyword'],
          merge(existing, incoming) {
            if (!existing) {
              return incoming;
            }

            return {
              ...incoming,
              edges: [...existing.edges, ...incoming.edges],
            };
          },
        },
      },
    },
    Repository: {
      fields: {
        reviews: {
          keyArgs: false,
          merge(existing, incoming) {
            if (!existing) {
              return incoming;
            }

            return {
              ...incoming,
              edges: [...existing.edges, ...incoming.edges],
            };
          },
        },
      },
    },
    User: {
      fields: {
        reviews: {
          keyArgs: false,
          merge(existing, incoming) {
            if (!existing) {
              return incoming;
            }

            return {
              ...incoming,
              edges: [...existing.edges, ...incoming.edges],
            };
          },
        },
      },
    },
  },
});

const createApolloClient = (authStorage) => {
  const uri = Constants.expoConfig?.extra?.apolloUri || 'http://localhost:4000';

  const httpLink = createHttpLink({ uri });

  const authLink = setContext(async (_, context) => {
    const accessToken = await authStorage.getAccessToken();

    return {
      headers: {
        ...context.headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  });

  return new ApolloClient({
    cache,
    link: ApolloLink.from([authLink, httpLink]),
  });
};

export default createApolloClient;

