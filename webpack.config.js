const path = require('path')
const webpack = require('webpack')
const postcssPresetEnv = require('postcss-preset-env')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: ['./src/index.js'],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          // { loader: "css-loader", options: { importLoaders: 1 } },
          { loader: 'css-loader', options: { url: false } },
          {
            loader: 'postcss-loader',
            options: {
              // ident: "postcss",
              postcssOptions: {
                plugins: [postcssPresetEnv(/* pluginOptions */)],
              },
              // plugins: () => [postcssPresetEnv(/* pluginOptions */)],
            },
          },
          'sass-loader',
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.scss'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '',
    filename: 'bundle.js',
    hashFunction: 'sha512',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build/'),
      publicPath: '/',
    },
    port: 3000,
    hot: 'only',
    // hotOnly: true,
    historyApiFallback: true,
    // disableHostCheck: true, //for ngrok
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: '' }],
    }),
  ],
}
