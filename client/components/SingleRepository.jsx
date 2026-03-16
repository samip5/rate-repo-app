import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../src/hooks/useRepository';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository(id);

  if (!repository) {
    return null;
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id: reviewId }) => reviewId}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<RepositoryItem item={repository} showGitHubButton />}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;

