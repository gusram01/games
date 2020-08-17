const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


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
  mode: 'development',
  entry: {
    home: './games/home/ts/index.ts',
    rock: './games/rock/ts/rock.ts'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name]/bundle.[hash].js',
    path: path.resolve(__dirname, 'public', 'games'),
    publicPath: '/games',
  },
  devServer: {
    open: true,
    openPage: 'games',
    publicPath: '/games'
  },
  optimization: {
    namedModules: true,
    nodeEnv: 'development',
    noEmitOnErrors: false,
    minimize: false,
    removeAvailableModules: false,
    concatenateModules: true,
    checkWasmTypes: true,
    splitChunks: {
      cacheGroups: {
        fooStyles: {
          name: 'home',
          test: (m, c, entry = 'home') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
        barStyles: {
          name: 'rock',
          test: (m, c, entry = 'rock') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: './games/home/index.html',
      filename: './index.html',
      excludeChunks: [
        'rock'
      ]
    }),
    new HtmlWebpackPlugin({
      template: './games/rock/rock.html',
      filename: './rock/index.html',
      excludeChunks: [
        'home'
      ]
    }),
    new MiniCssExtractPlugin({ filename: '[name]/bundle.[hash].css' }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          / backend /,
          /public/
        ]
      },

      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]

      },

      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: false,
        },
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/assets/',
              publicPath: '/assets/',
              emitFile: true,
              esModule: false
            }
          }
        ]
      },
    ]
  }
};