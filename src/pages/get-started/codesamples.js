/* eslint-disable import/prefer-default-export */

export const bootstrapCodeSample = `import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

ReactDOM.render(<App />, document.getElementById('root'));`;

export const appACodeSample = `import React from 'react';

export default function SayHelloFromA() {
  return <h1>Hello from Application A!</h1>;
}`;

export const appBCodeSample = `import React from 'react';

export default function SayHelloFromB() {
  return <h1>Hello from Application B!</h1>;
}`;

export const baseWebpackConfig = `const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
  mode,
  entry: './src/index',
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
        test: /\\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};`;

export const federationPluginA = `const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
  mode,
  entry: './src/index',
  output: {
    publicPath: 'http://localhost:3001/', // New
  },
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
        test: /\\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
    ],
  },

  plugins: [
    // New
    new ModuleFederationPlugin({
      name: 'application_a',
      library: { type: 'var', name: 'application_a' },
      filename: 'remoteEntry.js',
      exposes: {
        'SayHelloFromA': './src/app',
      },
      remotes: {
        'application_b': 'application_b',
      },
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};`;

export const federationPluginB = `const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
  mode,
  entry: './src/index',
  output: {
    publicPath: 'http://localhost:3002/', // New
  },
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
        test: /\\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
    ],
  },

  plugins: [
    // New
    new ModuleFederationPlugin({
      name: 'application_b',
      library: { type: 'var', name: 'application_b' },
      filename: 'remoteEntry.js',
      exposes: {
        'SayHelloFromB': './src/app',
      },
      remotes: {
        'application_a': 'application_a',
      },
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};`;

export const applicationAConsumesB = `import React from 'react';
import ReactDOM from 'react-dom';

import SayHelloFromB from 'application_b/SayHelloFromB';

import App from './app';

ReactDOM.render(
  <>
    <App />
    <SayHelloFromB />
  </>,
  document.getElementById('root')
);`;

export const applicationBConsumesA = `import React from 'react';
import ReactDOM from 'react-dom';

import SayHelloFromA from 'application_a/SayHelloFromA';

import App from './app';

ReactDOM.render(
  <>
    <App />
    <SayHelloFromA />
  </>,
  document.getElementById('root')
);`;
