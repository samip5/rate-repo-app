import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import useSignIn from '../src/hooks/useSignIn';
import useSignUp from '../src/hooks/useSignUp';

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
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be between 1 and 30 characters')
    .max(30, 'Username must be between 1 and 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be between 5 and 50 characters')
    .max(50, 'Password must be between 5 and 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await signUp({ username: values.username, password: values.password });
      await signIn({ username: values.username, password: values.password });
      navigate('/');
    },
  });

  const getInputStyle = (field) => [
    styles.input,
    formik.touched[field] && formik.errors[field] && styles.inputError,
  ];

  return (
    <View style={styles.container}>
      <TextInput
        style={getInputStyle('username')}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        autoCapitalize="none"
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={getInputStyle('password')}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <TextInput
        style={getInputStyle('passwordConfirmation')}
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
        secureTextEntry
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={styles.errorText}>{formik.errors.passwordConfirmation}</Text>
      )}

      <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text
          style={styles.submitButtonText}
          color="appBarTextPrimary"
          fontWeight="bold"
          fontSize="subheading"
        >
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;

