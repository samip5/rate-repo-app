const js = require('@eslint/js');
const babelParser = require('@babel/eslint-parser');
const reactPlugin = require('eslint-plugin-react');
const reactNativePlugin = require('eslint-plugin-react-native');

module.exports = [
  {
    ignores: ['node_modules/**', '.expo/**'],
  },
  js.configs.recommended,
  {
    files: ['App.js', 'components/**/*.{js,jsx}', 'src/**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['babel-preset-expo'],
        },
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      react: reactPlugin,
      'react-native': reactNativePlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];

