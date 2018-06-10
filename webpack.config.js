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

  console.log('Prod: ', prod);

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
              loader: 'css-loader', options: { sourceMap: true }
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
          use: ['html-loader', 'pug-html-loader']
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
      new HtmlWebPackPlugin({
        template: './index.pug',
      }),
      new MiniCssExtractPlugin({
        filename: prod ? 'css/[name].[hash:8].css' : '[name].css',
        chunkFilename: prod ? 'css/[id].[hash:8].css' : '[id].css',
      }),
      //prod
      new CleanPlugin(PATHS.build),
      new FriendlyErrorsPlugin(),
      // prod
      new CopyWebpackPlugin([
        {
          from: PATHS.public,
          to: PATHS.build
        }
      ]),
    ],
    devServer: {
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
