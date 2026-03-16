import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import { useAuthStorage } from '../utils/authStorageContext';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { username, password },
    });

    const accessToken = data?.authenticate?.accessToken;

    if (accessToken) {
      await authStorage.setAccessToken(accessToken);
      await apolloClient.resetStore();
    }

    return data;
  };

  return [signIn, result];
};

export default useSignIn;

