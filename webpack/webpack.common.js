const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/scripts/index.js'),
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor'
    }
  },
  
  plugins: [
    new CleanWebpackPlugin(['build'], { root: Path.resolve(__dirname, '..') }),
    
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: Path.resolve(__dirname, '../src/index.pug'),
    }),
    new HtmlWebpackExcludeAssetsPlugin()
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|svg)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          }
        }
      },
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              exports: false,
            },
          },
        ],
      },
    ]
  }
};
