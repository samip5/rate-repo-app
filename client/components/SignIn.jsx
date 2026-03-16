import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';

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
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const onSubmit = (values) => {
    globalThis.console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const usernameHasError = formik.touched.username && formik.errors.username;
  const passwordHasError = formik.touched.password && formik.errors.password;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, usernameHasError && styles.inputError]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        autoCapitalize="none"
      />
      {usernameHasError && <Text style={styles.errorText}>{formik.errors.username}</Text>}
      <TextInput
        style={[styles.input, passwordHasError && styles.inputError]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
      />
      {passwordHasError && <Text style={styles.errorText}>{formik.errors.password}</Text>}
      <Pressable style={styles.submitButton} onPress={formik.handleSubmit}>
        <Text
          style={styles.submitButtonText}
          color="appBarTextPrimary"
          fontWeight="bold"
          fontSize="subheading"
        >
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;