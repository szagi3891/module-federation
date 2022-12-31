//@ts-check
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const resolve_config = {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
};

const getBabelConfig = () => ({
    presets: [
        ['@babel/preset-env', {
            useBuiltIns: 'entry',
            corejs: '3.11.0',
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            // modules: removeDynamicImport ? 'commonjs' : false,
            loose: true
        }],
        ['@babel/preset-typescript', {
            'allowDeclareFields': true
        }],
        '@babel/preset-react'
    ],
    plugins: [
        'babel-plugin-lodash',
        [ '@babel/plugin-proposal-decorators', { legacy: true } ],
        // [ '@babel/plugin-proposal-class-properties', { loose: true } ],
        '@babel/plugin-transform-runtime'
    ]
});

const module_config = {
    rules: [{
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [{
            loader: "babel-loader",
            options: getBabelConfig()
            // options: {
            //     cacheDirectory: false,
            // },
        }],
    }],
};

module.exports = {
    name: "client",
    target: "web",
    entry: path.resolve(__dirname, "./src/index.tsx"),
    mode: "production",
    devtool: "source-map",
    resolve: resolve_config,
    module: module_config,
    output: {
        path: path.resolve(__dirname, "./dist/client"),
        filename: "[name].js",
        chunkFilename: "[name].js",
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
        }),
    ],
    devServer: {
        static: {
            // directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
};

// publicPath: "http://localhost:3000/static/",
//   plugins: [
//     moduleFederationPlugin.client,
//   ],
