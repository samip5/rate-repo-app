import Main from './components/Main';
import { NativeRouter } from 'react-router-native';

const App = () => {
  return (
    <NativeRouter future={{ v7_relativeSplatPath: true }}>
      <Main />
    </NativeRouter>
  );
};

export default App;