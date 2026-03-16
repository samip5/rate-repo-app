import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id, first = 8) => {
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id, first },
    skip: !id,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        id,
        first,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    repository: data?.repository,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useRepository;

