import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (variables = { includeReviews: false }) => {
  const { data, loading, error, fetchMore } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading &&
      variables.includeReviews &&
      data?.me?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        ...variables,
        after: data.me.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    authorizedUser: data?.me,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useAuthorizedUser;

