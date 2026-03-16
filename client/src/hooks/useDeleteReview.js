import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_AUTHORIZED_USER,
        variables: { includeReviews: true, first: 8 },
      },
    ],
  });

  const deleteReview = async (id) => {
    const { data } = await mutate({
      variables: { id },
    });

    return data?.deleteReview;
  };

  return [deleteReview, result];
};

export default useDeleteReview;

