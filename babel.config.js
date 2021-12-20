module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          ie: '11',
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
    [ '@babel/plugin-proposal-decorators', { legacy: true } ],
    '@babel/plugin-proposal-class-properties',
    'lodash',
  ],
};
