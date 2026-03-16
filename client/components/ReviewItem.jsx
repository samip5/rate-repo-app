import { Pressable, StyleSheet, View } from 'react-native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    flexDirection: 'row',
    padding: 16,
  },
  ratingContainer: {
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderRadius: 30,
    borderWidth: 2,
    height: 56,
    justifyContent: 'center',
    marginRight: 12,
    width: 56,
  },
  ratingText: {
    color: theme.colors.primary,
  },
  content: {
    flex: 1,
  },
  date: {
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 14,
  },
  actionButton: {
    borderRadius: 4,
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    marginRight: 0,
  },
  actionText: {
    textAlign: 'center',
  },
});

const ReviewItem = ({
  review,
  showRepositoryName = false,
  onViewRepository,
  onDeleteReview,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText} fontWeight="bold" fontSize="subheading">
          {review.rating}
        </Text>
      </View>

      <View style={styles.content}>
        <Text fontWeight="bold" fontSize="subheading">
          {showRepositoryName ? review.repository.fullName : review.user.username}
        </Text>
        <Text style={styles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text>{review.text}</Text>

        {(onViewRepository || onDeleteReview) && (
          <View style={styles.actions}>
            {onViewRepository && (
              <Pressable
                style={[styles.actionButton, styles.viewButton]}
                onPress={onViewRepository}
              >
                <Text style={styles.actionText} color="appBarTextPrimary" fontWeight="bold">
                  View repository
                </Text>
              </Pressable>
            )}
            {onDeleteReview && (
              <Pressable
                style={[styles.actionButton, styles.deleteButton]}
                onPress={onDeleteReview}
              >
                <Text style={styles.actionText} color="appBarTextPrimary" fontWeight="bold">
                  Delete review
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default ReviewItem;

