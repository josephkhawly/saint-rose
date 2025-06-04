const path = require('path')
const webpack = require('webpack')
const postcssPresetEnv = require('postcss-preset-env')

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
    path: path.resolve(__dirname, 'public'),
    publicPath: '',
    filename: 'bundle.js',
    hashFunction: 'sha512',
  },
  devServer: {
    // static: path.join(__dirname, "public/"),
    // static: {
    //   directory: path.join(__dirname, "public"),
    //   publicPath: "/",
    // },
    static: {
      directory: path.join(__dirname, 'public/'),
      publicPath: '/',
    },
    port: 3000,
    // publicPath: "/",
    hot: 'only',
    // hotOnly: true,
    historyApiFallback: true,
    // disableHostCheck: true, //for ngrok
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}
