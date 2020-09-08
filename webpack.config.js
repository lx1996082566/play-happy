const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Visualizer = require('webpack-visualizer-plugin') // 可视化并分析您的Webpack捆绑包，以查看哪些模块正在占用空间，哪些可能是重复的
const devMode = process.env.NODE_ENV === 'development'
// const argv = process.argv // 直接在package.js的内设置env模式
// console.log('argv(--env=):', argv);
const handler = (percentage, message, ...args) => {
    // e.g. Output each progress message directly to the console:
    let currentProcess = (percentage * 100).toFixed(2) + '%'
    console.info('当前进度：' + currentProcess, '=========' + message + '=========');
};
console.log('当前启用(NODE_ENV=):', process.env.NODE_ENV);
function resolve(dir) {
    return path.resolve(__dirname, dir)
}
module.exports = (opts) => {
    const isAnalyzer = process.env.NODE_ENV === 'analyzer'
    let config = {
        mode: devMode ? 'development' : 'production',
        entry: {
            'main': './src/main.js',
        },
        output: {
            path: resolve('./dist'),
            filename: 'js/[name].[hash].js'
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.(le|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // 是否热更新
                                hmr: devMode,
                                // 如果 hmr 不工作, 请开启强制选项
                                reloadAll: true,
                            }
                        }, 'css-loader', 'less-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                }
            ]
        },
        optimization: {
            minimize: !devMode,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        ecma: undefined,
                        warnings: false,
                        parse: {},
                        compress: {
                            // drop_debugger: false,  // 除了这两句是我加的，基他都是默认配置
                            drop_console: true
                        },
                        mangle: true, // Note `mangle.properties` is `false` by default.
                        module: false,
                        output: null,
                        toplevel: false,
                        nameCache: null,
                        ie8: false,
                        keep_classnames: undefined,
                        keep_fnames: false,
                        safari10: false,
                    },
                }),
            ]
            // splitChunks: {
            //     cacheGroups: {
            //         // 所有的 CSS 可以被提取到一个 CSS    
            //         styles: {
            //             name: 'styles',
            //             test: /\.css$/,
            //             chunks: 'all',
            //             enforce: true,
            //         },
            //     },
            // },
        },
        plugins: (plugins => {
            plugins.push.apply(plugins, [
                new CleanWebpackPlugin(),
                new HtmlWebpackPlugin({
                    title: 'test webpack',
                    template: './public/index.html',
                    favicon: resolve('./public/favicon.ico'),
                    inject: true
                }),
                new MiniCssExtractPlugin({
                    filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
                    chunkFilename: devMode ? '[id].css' : '[id].[hash].css', // chunkFilename 如何处理非entry模块
                }),
                new VueLoaderPlugin(),
            ])
            if (!devMode) {
                if (isAnalyzer) {
                    plugins.push(new BundleAnalyzerPlugin({ generateStatsFile: true }))
                }
                plugins.push.apply(plugins, [
                    new webpack.ProgressPlugin(handler),
                    new Visualizer()
                ])
            } else {
                plugins.push.apply(plugins, [
                    new webpack.HotModuleReplacementPlugin(),
                    new webpack.NamedModulesPlugin(),
                ])
            }
            return plugins
        })([]),
    }
    if (devMode) {
        config.devServer = {
            host: 'localhost',
            port: 6767,
            proxy: {
                "/": {
                    target: 'http://localhost:8181',
                    pathRewrite: { '^/': '/' },
                    changeOrigin: true
                }
            },
            hot: true, // 热更新
            open: true
        }
    }
    return config
}