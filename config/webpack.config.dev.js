const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    home: './games/home/ts/index.ts',
    rock: './games/rock/ts/rock.ts',
    simon: './games/simon/ts/simon.ts'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name]/bundle.[hash].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
  },
  devServer: {
    open: true,
  },
  optimization: {
    namedModules: true,
    nodeEnv: 'development',
    noEmitOnErrors: false,
    minimize: false,
    removeAvailableModules: false,
    concatenateModules: true,
    checkWasmTypes: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './games/home/index.html',
      filename: './index.html',
      chunks: [ 'home' ]
    }),
    new HtmlWebpackPlugin({
      template: './games/rock/rock.html',
      filename: './rock/index.html',
      chunks: [ 'rock' ]
    }),
    new HtmlWebpackPlugin({
      template: './games/simon/simon.html',
      filename: './simon/index.html',
      chunks: [ 'simon' ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          /public/,
          /tsc/,
          /dist/,
          /docs/
        ]
      },

      {
        test: /\.css$/i,
        use: [ 'style-loader', 'css-loader' ],
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/assets/img',
              publicPath: '/assets/img',
              emitFile: true
            }
          }
        ]
      },

      {
        test: /\.(wav|mp3|ogg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/assets/audio',
              publicPath: '/assets/audio',
              emitFile: true
            }
          }
        ]
      },
    ]
  }
};