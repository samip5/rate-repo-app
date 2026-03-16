import { Image, StyleSheet, View, Pressable, Linking } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 4,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  fullName: {
    marginBottom: 4,
  },
  description: {
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    color: theme.colors.appBarTextPrimary,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 16,
    paddingVertical: 12,
  },
  githubButtonText: {
    textAlign: 'center',
  },
});

const formatCount = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }

  return String(value);
};

const Stat = ({ label, value }) => (
  <View style={styles.stat}>
    <Text fontWeight="bold" fontSize="subheading">
      {formatCount(value)}
    </Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export const RepositoryInfo = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.info}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.fullName}>
            {item.fullName}
          </Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language} color="appBarTextPrimary">
            {item.language}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <Stat label="Stars" value={item.stargazersCount} />
        <Stat label="Forks" value={item.forksCount} />
        <Stat label="Reviews" value={item.reviewCount} />
        <Stat label="Rating" value={item.ratingAverage} />
      </View>
    </View>
  );
};

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  const onOpenRepository = () => {
    if (item.url) {
      Linking.openURL(item.url);
    }
  };

  return (
    <View testID="repositoryItem">
      <RepositoryInfo item={item} />
      {showGitHubButton && (
        <View style={styles.container}>
          <Pressable style={styles.githubButton} onPress={onOpenRepository}>
            <Text
              style={styles.githubButtonText}
              color="appBarTextPrimary"
              fontWeight="bold"
              fontSize="subheading"
            >
              Open in GitHub
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default RepositoryItem;
