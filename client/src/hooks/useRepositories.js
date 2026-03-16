import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const mapConnectionToNodes = (connection) => {
  if (!connection) {
    return [];
  }

  return connection.edges.map((edge) => edge.node);
};

const useRepositories = (variables) => {
  const { data, loading, error, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        ...variables,
        after: data.repositories.pageInfo.endCursor,
      },
    });
  };

  return {
    repositories: mapConnectionToNodes(data?.repositories),
    fetchMore: handleFetchMore,
    loading,
    error,
    ...result,
  };
};

export default useRepositories;

