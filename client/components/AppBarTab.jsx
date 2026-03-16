import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});

const AppBarTab = ({ label, to }) => {
  return (
    <Link to={to} style={styles.tab} underlayColor="transparent">
      <Text color="appBarTextPrimary" fontSize="subheading" fontWeight="bold">
        {label}
      </Text>
    </Link>
  );
};

export default AppBarTab;

