const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  public: path.join(__dirname, '__public__')
};

module.exports = (env, argv) => {
  const prod = argv.mode === 'production';
  process.env.NODE_ENV = argv.mode;

  return {
    context: PATHS.app,
    entry: './scripts/index.ts',
    output: {
      path: PATHS.build,
      publicPath: '/',
      chunkFilename: prod ? 'scripts/[name].[chunkhash:8].js' : undefined,
      filename: prod ? 'scripts/[name].[chunkhash:8].js' : undefined
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.less$/,
          use: [
            prod ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader', options: { sourceMap: true, minimize: prod }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')]
              }
            },
            {
              loader: 'less-loader', options: { sourceMap: true }
            }
          ]
        },
        {
          test: /\.pug$/,
          use: [
            'html-loader',
            {
              loader: 'pug-html-loader',
              options: {
                data: {
                  showMoreInfo: false,
                  showProducts: false
                }
              }
            }
          ],
        },
        {
          test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]'
            }
          }
        },
        {
          test: /\.(png|jpg|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 15000,
              name: 'images/[name].[hash:8].[ext]'
            }
          }
        },
      ]
    },
    plugins: [
      new FriendlyErrorsPlugin(),
      new HtmlWebPackPlugin({
        template: './index.pug',
      }),
      ... prod
          ? [
          new MiniCssExtractPlugin({
            filename: prod ? 'css/[name].[hash:8].css' : '[name].css',
            chunkFilename: prod ? 'css/[id].[hash:8].css' : '[id].css',
          }),
          new CleanPlugin(PATHS.build),
          new CopyWebpackPlugin([
            {
              from: PATHS.public,
              to: PATHS.build
            }
          ]),
        ]
          : [],
    ],
    optimization: !prod ? {} : {
      noEmitOnErrors: true,
      concatenateModules: true,
      minimize: true,
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    devServer: prod ? {} : {
      watchOptions: {
        ignored: /node_modules/
      },
      publicPath: '/',
      historyApiFallback: true,
      stats: 'errors-only',
      host: process.env.HOST, // Defaults to `localhost`
      port: process.env.PORT, // Defaults to 8080
      overlay: {
        errors: true,
        warnings: false
      }
    }
  };
};
