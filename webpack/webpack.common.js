const path = require('path');

const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { IgnorePlugin, NoEmitOnErrorsPlugin } = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const nodeModules = path.join(process.cwd(), 'node_modules');
const uiToolkit = path.join(nodeModules, 'beeline-react-ui-toolkit');
const uiToolkitNodeModules = path.join(uiToolkit, 'node_modules');
const entryPoints = [ 'inline', 'polyfills', 'styles', 'vendor', 'main' ];
const src = path.resolve(__dirname, '../src');
const react = path.join(src, 'app', '_react');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // target: 'node',
  // externals: [nodeExternals()],
  resolve: {
    symlinks: false,
    extensions: [ '.js', '.jsx' ],
    modules: [ react, nodeModules, uiToolkitNodeModules ],
    alias: {
      assets: path.join(src, 'assets'),
      components: path.join(src, 'components'),
      environment$: path.join(src, 'environments/environment.jsx'),
      modules: path.join(react, 'modules'),
      tools: path.join(react, 'tools'),
      'ui-toolkit': path.join(react, 'components', 'ui-toolkit'),
      utils: path.join(react, 'utils'),
      'styled-components': path.join(nodeModules, 'styled-components'),
      API: path.join(src, 'app/api.jsx'),
      useAPI: path.join(src, 'app/useAPI.jsx'),
      'lodash-es': 'lodash',
    },
  },

  resolveLoader: {
    modules: [nodeModules],
  },

  entry: {
    main: './src/app/index.jsx',
    polyfills: './src/app/polyfills.jsx',
  },

  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js',
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loaders: [ 'style-loader', 'css-loader' ] },
      { test: /\.svg$/, loader: 'svg-react-loader', include: [ uiToolkit, react ] },
      { test: /\.(eot|svg)$/, loader: 'file-loader?name=[name].[hash:20].[ext]', exclude: [ uiToolkit, react ] },
      { test: /\.(jpg|png|gif|cur|ani)$/, loader: 'url-loader?name=[name].[hash:20].[ext]&limit=70000' },
      { test: /\.(otf|ttf|woff|woff2)$/, loader: 'file-loader' },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
        },
      }
    }
  },

  plugins: [
    new NoEmitOnErrorsPlugin(),
    new LodashModuleReplacementPlugin(),

    new CopyWebpackPlugin([
      { from: 'assets/**/*', ignore: [ 'assets/fonts/*', 'assets/scss/*' ] },
      '../web.config',
      'favicon.ico',
    ], { context: src }),

    new ProgressPlugin(),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunksSortMode: function sort(left, right) {
        return right.names[0] === 'polyfills' ? 1 : -1;
      },

      xhtml: true,
    }),

    new FilterWarningsPlugin({
      exclude: [
        /Missing @custom-media definition for \'--tablet\'/,
        /\'DatePickerStateless\' was not found/,
      ],
    }),

    new IgnorePlugin(/.*/, /moment\/locale/),

  ],

  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    crypto: true,
  },

};
