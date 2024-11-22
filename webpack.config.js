const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./index.js",
  output: {
    filename: 'bundle.[contenthash].js',  // Added hash for cache busting
    path: path.resolve(__dirname, "dist"),
    clean: true,  // Clean the output directory before emit
    publicPath: '/',  // Set to root path for GitHub Pages
  },
  devServer: {
    open: true,
    host: "localhost",
    watchFiles: 'index.html',
    historyApiFallback: true,  // Added for client-side routing support
    port: 3000,  // Explicitly set port
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: './src/assets/', 
          to: './assets/',
          noErrorOnMissing: true  // Don't fail if assets directory is empty
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: 'body',
      minify: {  // Minify HTML in production
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        exclude: /node_modules/,  // Exclude node_modules for better build performance
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024  // Inline files smaller than 8kb
          }
        }
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',  // Split vendor modules into separate chunks
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],  // Auto-resolve these extensions
  },
};