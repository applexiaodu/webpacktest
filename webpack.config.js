//基于node的，遵循commonjs规范
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
//热更新插件
let webpack = require('webpack');
let ExtractTextWebpakcPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let PurifyCssWebpack = require('purifycss-webpack');
let Glob = require('glob');
let LessExtract = new ExtractTextWebpakcPlugin({
    filename:'css/less.css',
    disable:true
});
let CssExtract = new ExtractTextWebpakcPlugin({
    filename:'css/css.css',
    disable:true
});

//mini-css-extract-plugin
// let MiniCssExtractPlugin = require('mini-css-extract-plugin');
//单页 index.html 引用了多个js
//多页a.html index.js / b.html a.js
module.exports = {
    entry:'./src/index.js',//入口
    //entry:['./src/index.js','./src/a.js'],//入口,可以写一个数组
    // entry:{//多入口配多出口
    //     index:'./src/index.js',
    //     a:'./src/a.js'
    // },
    output:{
        //filename:'build.[hash:8].js',
        filename:'[name].[hash:8].js',//多出口
        //这个路径必须是绝对路径
        path:path.resolve('./build')
    },//出口
    devServer:{
        contentBase:'./build',
        port:3000,
        compress:true,//服务器压缩
        open:true,//自动打开浏览器
        hot:true
    },//开发服务器
    module:{
        rules:[//从左往右写
            {
                test:/\.css$/,
                use:CssExtract.extract({
                    fallback:'style-loader',//禁用抽离css样式时，本地开发也显示样式
                    user:[
                        // {loader:'style-loader'},
                        {loader:'css-loader'},
                        {loader:'postcss-loader'}
                    ]
                })
            },
            {
                test:/\.less$/,
                use:LessExtract.extract({
                    fallback:'style-loader',//禁用抽离css样式时，本地开发也显示样式
                    user:[
                        // {loader:'style-loader'},
                        {loader:'css-loader'},
                        {loader:'less-loader'}
                    ]
                })
            }
            //mini-css-extract
            // {
            //     test:/\.css$/,
            //         user:[
            //             MiniCssExtractPlugin.loader,
            //             {loader:'style-loader'},
            //             {loader:'css-loader'}
            //         ]
            // },
            // {
            //     test:/\.less$/,
            //         user:[
            //             MiniCssExtractPlugin.loader,
            //             {loader:'style-loader'},
            //             {loader:'css-loader'},
            //             {loader:'less-loader'}
            //         ]
            // }
        ]
    },//模块配置
    plugins:[//插件
        //样式抽离插件
        // new ExtractTextWebpakcPlugin({
        //     filename:'css/index.css'
        // }),
        //css抽离到css.css,less抽离到less.css
        LessExtract,
        CssExtract,
        //拷贝插件
        new CopyWebpackPlugin([{
            from:'./src/doc',
            to:'public',//build中的public文件夹
        }]),
        //min-css-extract插件
        // new MiniCssExtractPlugin({
        //     filename:'css/css.css'
        // }),
        //热更新
        new webpack.HotModuleReplacementPlugin(),
        //清空build文件
        new CleanWebpackPlugin(['./build']),
        //打包html插件
        new HtmlWebpackPlugin({
            // filename:'a.html',
            template:'./src/index.html',
            title:'学习webpack4.16',
            //替换掉之前的文件，印文件的时候自动呆一串hash
            hash:true
            // ,
            // chunks:['index']
            // minify:{
            //     removeAttributeQuotes:true,
            //     collapseWhitespace:true
            // }
        }),
        //没用的css消除掉，一定放在HtmlWebpackPlugin后面
        new PurifyCssWebpack({
            paths: glob.sync(path.resolve('src/*.html'))
        })
        // ,
        // new HtmlWebpackPlugin({
        //     filename:'b.html',
        //     template:'./src/index.html',
        //     title:'学习webpack4.16',
        //     //替换掉之前的文件，印文件的时候自动呆一串hash
        //     hash:true,
        //     chunks:['a']
        //     // minify:{
        //     //     removeAttributeQuotes:true,
        //     //     collapseWhitespace:true
        //     // }
        // })
    ],//插件的配置
    mode:'development',//可以更改模式
    resolve:{},//配置解析
}
//1.在webpack中如何配置开发服务器 webpack-dev-server
//2.webpack插件 1.将html打包到build下可以自动引入生产的js
//npm intstall html-webpack-plugin -D
//每次运行 npm build都会产生一个新文件，
//用npm install clean-webpack-plugin -D 清除webpack的插件
//抽离样式，抽离到一个css文件，通过css文件的方式引用
//---npm install extract-text-webpack-plugin@next mini-css-extract-plugin -D
//消除多余的css
//npm install purifycss-webpack purify-css glob-D
//npm install postcss-loader autoprefixer -D
//原封不动的将src下的文件夹放到build文件夹中
//npm install copy-webpack-plugin -D
//暴露插件
//ProvidePlugin express-loader