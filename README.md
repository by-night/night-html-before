### 此插件功能为: 在 html-webpack-plugin 生成的js文件 之前，插入自定义的js文件
`github 项目地址：`(https://github.com/by-night/night-html-before)  
#### 下载  
```
npm install night-html-before
```
#### 使用说明：  
```
const BeforePlugin = require('night-html-before');

// 在 webpack 的 plugins 中 
plugins: [
    new BeforePlugin({
        paths: ["./configuration/test.js"]  // 数组为需要插入的js文件
    })
    ...
]
```
#### 生成的文件

```
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    <div id="root"></div>
    
    // 自定义的 js 文件
    <script src="./configuration/test.js"></script>

    // 打包生成的 chunk 文件
    <script src="/static/js/bundle.js"></script>
    <script src="/static/js/vendors~main.chunk.js"></script>
    <script src="/static/js/main.chunk.js"></script></body>
</html>
```