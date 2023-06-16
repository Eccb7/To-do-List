const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Update the path to your index.html file
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), // Specify the content base directory
    },
  },
  stats: {
    children: true, // Enable detailed output for child compilations
  },
};
