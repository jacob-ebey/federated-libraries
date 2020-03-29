/* eslint-disable import/no-unresolved */
const { DefinePlugin } = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const ReactRouterHtmlPlugin = require('./webpack/ReactRouterHtmlPlugin');

const routes = require('./src/routes.js').map((route) => route.path);

/** @typedef {import("webpack").Configuration} Configuration */

const mode = process.env.NODE_ENV || 'production';

/**
 * @type {Configuration}
 */
module.exports = {
  entry: './src/index',

  output: {
    publicPath: mode === 'development' ? 'http://localhost:3001/' : '/',
  },

  mode,

  devtool: 'source-map',

  optimization: {
    minimize: mode === 'production',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
      {
        test: /\.mdx?$/,
        use: ['babel-loader', '@mdx-js/loader'],
      },
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.global\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'federated_library_boilerplate',
      library: { type: 'var', name: 'federated_library_boilerplate' },
      filename: 'remoteEntry.js',
      exposes: {
        AppShell: './src/components/app-shell',
        Hero: './src/components/hero',
      },
      shared: ['react', 'react-dom', 'semantic-ui-react'],
    }),
    new ReactRouterHtmlPlugin({
      template: './public/index.html',
      routes,
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
  ],
};
