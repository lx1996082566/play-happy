const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'
const handler = (percentage, message, ...args) => {
    // e.g. Output each progress message directly to the console:
    let currentProcess = (percentage * 100).toFixed(2) + '%'
    console.info('当前进度：' + currentProcess, '=========' + message + '=========');
};
module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(le|c)ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // 是否热更新
                        hmr: devMode,
                        // 如果 hmr 不工作, 请开启强制选项
                        reloadAll: true,
                    }
                }, 'css-loader', 'less-loader']
            },
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        new webpack.ProgressPlugin(handler),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'test webpack',
            template: './public/index.html',
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css', // chunkFilename 如何处理非entry模块
        }),
    ]
}