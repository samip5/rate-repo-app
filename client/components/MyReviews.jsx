import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import ReviewItem from './ReviewItem';
import useAuthorizedUser from '../src/hooks/useAuthorizedUser';
import useDeleteReview from '../src/hooks/useDeleteReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const navigate = useNavigate();
  const { authorizedUser, fetchMore } = useAuthorizedUser({ includeReviews: true, first: 8 });
  const [deleteReview] = useDeleteReview();

  const reviews = authorizedUser?.reviews?.edges?.map((edge) => edge.node) || [];

  const handleDeleteReview = (reviewId) => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteReview(reviewId);
        },
      },
    ]);
  };

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          showRepositoryName
          onViewRepository={() => navigate(`/repositories/${item.repository.id}`)}
          onDeleteReview={() => handleDeleteReview(item.id)}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default MyReviews;

