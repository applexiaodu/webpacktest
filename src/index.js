let str = require('./a.js');
// console.log(str+1);
document.getElementById("app").innerHTML = str;
// import './index.css'
// import './style.less'
// console.log('index.js');
//热更新
if(module.hot){
    module.hot.accept();
    // module.hot.accept('./a.js',function(){
    //     let str = require('./a.js');
    //     document.getElementById("app").innerHTML = str;
    // })
}