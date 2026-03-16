import Main from './components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import AuthStorage from './src/utils/authStorage';
import createApolloClient from './src/utils/apolloClient';
import { AuthStorageContext } from './src/utils/authStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <NativeRouter future={{ v7_relativeSplatPath: true }}>
          <Main />
        </NativeRouter>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
};

export default App;