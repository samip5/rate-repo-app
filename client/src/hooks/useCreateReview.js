import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async (review) => {
    const { data } = await mutate({
      variables: {
        repositoryName: review.repositoryName,
        ownerName: review.ownerName,
        rating: Number(review.rating),
        text: review.text || null,
      },
    });

    return data?.createReview;
  };

  return [createReview, result];
};

export default useCreateReview;

