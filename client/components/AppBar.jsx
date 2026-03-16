import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useAuthorizedUser from '../src/hooks/useAuthorizedUser';
import useSignOut from '../src/hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { authorizedUser } = useAuthorizedUser();
  const signOut = useSignOut();

  const onSignOut = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab label="Repositories" to="/" />
        {authorizedUser ? (
          <>
            <AppBarTab label="Create a review" to="/create-review" />
            <AppBarTab label="My reviews" to="/my-reviews" />
            <AppBarTab label="Sign out" onPress={onSignOut} />
          </>
        ) : (
          <>
            <AppBarTab label="Sign in" to="/signin" />
            <AppBarTab label="Sign up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

