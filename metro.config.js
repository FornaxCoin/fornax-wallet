/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const extraNodeModules = require('node-libs-browser');

module.exports = {
  resolver: {
    extraNodeModules: {
      extraNodeModules,
      crypto: './node_modules/react-native-crypto',
      stream: './node_modules/react-native-stream',
      https: './node_modules/react-native-http',
      http: './node_modules/react-native-http',
      os: './node_modules/os-browserify',
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
