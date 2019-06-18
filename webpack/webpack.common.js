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
    // app_ar: Path.resolve(__dirname, '../src/scripts/index.ar.js')
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        fooStyles: {
          name: 'app',
          test: (m,c,entry = 'app') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true
        },
        // barStyles: {
        //   name: 'app_ar',
        //   test: (m,c,entry = 'app_ar') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
        //   chunks: 'all',
        //   enforce: true
        // }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['build'], { root: Path.resolve(__dirname, '..') }),
    
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: Path.resolve(__dirname, '../src/index.pug'),
      // excludeAssets: [/app_ar.*.js/, /app_ar.*.css/]
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'ar/index.html',
    //   template: Path.resolve(__dirname, '../src/ar/index.pug'),
    //   excludeAssets: [/app_en.*.js/, /app_en.*.css/]
    // }),
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
