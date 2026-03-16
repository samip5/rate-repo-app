import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
  },
  subheading: {
    fontSize: theme.fontSizes.subheading,
  },
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ children, style, color, fontWeight, fontSize, ...props }) => {
  const textStyle = [styles.text, style];

  if (color && theme.colors[color]) {
    textStyle.push({ color: theme.colors[color] });
  }

  if (fontWeight === 'bold') {
    textStyle.push(styles.bold);
  }

  if (fontSize === 'subheading') {
    textStyle.push(styles.subheading);
  }

  return (
    <NativeText style={textStyle} {...props}>
      {children}
    </NativeText>
  );
};

export default Text;

