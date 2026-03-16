import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    error: '#d73a4a',
    primary: '#0366d6',
    backgroundPrimary: '#ffffff',
    backgroundSecondary: '#e1e4e8',
    appBarBackground: '#24292e',
    appBarTextPrimary: '#ffffff',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
};

export default theme;

