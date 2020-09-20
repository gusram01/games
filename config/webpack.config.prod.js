const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

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
  mode: 'production',
  entry: {
    home: './games/home/ts/index.ts',
    rock: './games/rock/ts/rock.ts',
    simon: './games/simon/ts/simon.ts'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', 'jsx' ],
  },
  output: {
    filename: 'src/js/[name].[hash].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
  },
  optimization: {
    namedModules: false,
    nodeEnv: 'production',
    concatenateModules: true,
    noEmitOnErrors: true,
    checkWasmTypes: true,
    minimize: true,
    minimizer: [ new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({}) ],
    splitChunks: {
      cacheGroups: {
        homeStyles: {
          name: 'home',
          test: (m, c, entry = 'home') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
        rockStyles: {
          name: 'rock',
          test: (m, c, entry = 'rock') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
        simonStyles: {
          name: 'simon',
          test: (m, c, entry = 'simon') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
      }
    },
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
    new MiniCssExtractPlugin({ filename: 'src/css/[name].[hash].css' }),

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
        ],
      },

      {
        test: /\.css$/i,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
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
          },
          {
            loader: 'image-webpack-loader',
            options: {
              // bypassOnDebug: true, // webpack@1.x
              // disable: true, // webpack@2.x and newer
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [ 0.65, 0.90 ],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            },
          },
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