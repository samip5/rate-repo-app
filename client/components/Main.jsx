import { View, StyleSheet } from 'react-native';
import { Navigate, Route, Routes } from 'react-router-native';
import theme from '../theme';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';
import useAuthorizedUser from '../src/hooks/useAuthorizedUser';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
});

const Main = () => {
  const { authorizedUser, loading } = useAuthorizedUser();

  if (loading) {
    return (
      <View style={styles.container}>
        <AppBar />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repositories/:id" element={<SingleRepository />} />
        <Route
          path="/signin"
          element={authorizedUser ? <Navigate to="/" replace /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={authorizedUser ? <Navigate to="/" replace /> : <SignUp />}
        />
        <Route
          path="/create-review"
          element={authorizedUser ? <CreateReview /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/my-reviews"
          element={authorizedUser ? <MyReviews /> : <Navigate to="/signin" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;