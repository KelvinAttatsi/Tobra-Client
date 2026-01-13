module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      // ✅ Fix for Reanimated v3+
      'react-native-worklets/plugin',
    ],
  };
};