const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { NodeFederationPlugin, StreamingTargetPlugin } = require("@module-federation/node");
const deps = require("./package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const NodemonPlugin = require('nodemon-webpack-plugin');
const webpack = require('webpack');

module.exports = [
  {
    name: "client",
    target: "web",
    entry: ["@babel/polyfill", path.resolve(__dirname, "./src/index.ts")],
    resolve: {
      alias: {
        src: path.join(__dirname, 'src'),
      },
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: false,
              },
            },
          ],
        }
      ],
    },
    mode: "development",
    devtool: "source-map",

    output: {
      path: path.resolve(__dirname, "./dist/client"),
      filename: "[name].js",
      chunkFilename: "[name].js",
      publicPath: "http://localhost:3044/client/",
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "sportsbook",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App",
          "./appState": "./src/state/appState",
        },
        shared: [{ "react": deps.react, "react-dom": deps["react-dom"] }],
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
  },
  {
    name: "server",
    target: false,
    entry: ["@babel/polyfill", path.resolve(__dirname, "./src/index.ts")],
    resolve: {
      alias: {
        src: path.join(__dirname, 'src'),
      },
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: false,
              },
            },
          ],
        }
      ],
    },
    output: {
      path: path.resolve(__dirname, "./dist/server"),
      filename: "[name].js",
      libraryTarget: "commonjs-module",
    },
    mode: "development",
    plugins: [
      new NodeFederationPlugin({
        name: "sportsbook",
        filename: "remoteEntry.js",
        library: { type: "commonjs-module" },
        exposes: {
          "./App": "./src/App",
          "./appState": "./src/state/appState",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new StreamingTargetPlugin({
        name: "sportsbook",
        library: { type: "commonjs-module" },
      }),
      new NodemonPlugin({
        script: 'dist/server/main.js',
        watch: path.resolve('./dist/server/main.js'),
      }),
      new webpack.ProgressPlugin(),
    ],
    stats: {
      colors: true,
    },
  }];
