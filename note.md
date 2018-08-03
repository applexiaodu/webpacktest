<!-- 全局安装 -->
npm install webpack -g   //不推荐



初始化package.json
npm init -y


本地安装
npm install webpack wedpack-cli -D  //D表示只在线下用,上线不用

在webpack中所有文件都是模块
js模块 模块化（AMD CMD es6Moudle commonjs）

允许直接运行webpack
会执行mode_moduled对应的bin下的webpack.cmd
npx webpack

"scripts": {
    "build": "webpack",//上线
    "start":"webpack-dev-server"//开发
  },

//两个核心
  plugins
  loader 

npm install style-loader css-loader less less-loader stylus stylus-loader node-sass sass-loader -D