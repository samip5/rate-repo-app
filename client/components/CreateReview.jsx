import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import useCreateReview from '../src/hooks/useCreateReview';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 16,
  },
  input: {
    borderColor: '#d1d5da',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingVertical: 14,
  },
  submitButtonText: {
    textAlign: 'center',
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .integer('Rating must be an integer')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup.string(),
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const createdReview = await createReview(values);
      if (createdReview?.repositoryId) {
        navigate(`/repositories/${createdReview.repositoryId}`);
      }
    },
  });

  const getInputStyle = (field) => {
    return [styles.input, formik.touched[field] && formik.errors[field] && styles.inputError];
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={getInputStyle('ownerName')}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={getInputStyle('repositoryName')}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={getInputStyle('rating')}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        keyboardType="numeric"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={getInputStyle('text')}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
        multiline
      />

      <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text
          style={styles.submitButtonText}
          color="appBarTextPrimary"
          fontWeight="bold"
          fontSize="subheading"
        >
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;

