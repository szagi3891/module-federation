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
        mode: "development",
        devtool: "source-map",
        output: {
            path: path.resolve(__dirname, "./dist/client"),
            filename: "[name].js",
            chunkFilename: "[name].js",
            publicPath: "http://localhost:6010/static/",
        },
        plugins: [
            new ModuleFederationPlugin({
                name: "shell",
                filename: "container.js",
                remotes: {
                    players: "players@http://localhost:3043/client/remoteEntry.js",
                    sportsbook: "sportsbook@http://localhost:3044/client/remoteEntry.js",
                },
                shared: [{ "react": deps.react, "react-dom": deps["react-dom"] }],
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
        ],
    },
    {
        name: "server",
        target: false,
        entry: ["@babel/polyfill", path.resolve(__dirname, "./server/index.ts")],
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
                name: "shell",
                library: { type: "commonjs-module" },
                filename: "remoteEntry.js",
                remotes: {
                    players: "players@http://localhost:3043/server/remoteEntry.js",
                    sportsbook: "sportsbook@http://localhost:3044/server/remoteEntry.js",
                },
                shared: {
                    ...deps,
                    react: { singleton: true, eager: false, requiredVersion: deps.react },
                    "react-dom": {
                      singleton: true,
                      eager: false,
                      requiredVersion: deps["react-dom"],
                    },
                  },
            }),
            new StreamingTargetPlugin({
                name: "shell",
                library: { type: "commonjs-module" },
                remotes: {
                    players: "players@http://localhost:3043/server/remoteEntry.js",
                    sportsbook: "sportsbook@http://localhost:3044/server/remoteEntry.js",
                },
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
