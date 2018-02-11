# operation-web

## 只支持IE9及以上浏览器

## WebStorm设置
```
1:Webstorm webpack经常不能自动热更新问题
    File ==> Settings ==> System Settings ==> 关闭 Use "safe write"(save changes to a temporary file first)
2:Webstorm 支持precss
    File ==> Settings ==> File Types ==> Cascading Style Sheet 在Registered Patterns中删除*.css关联
    File ==> Settings ==> File Types ==> SCSS 下在Registered Patterns中添加*.css关联
```

## 如何开始?
```
1:设置淘宝镜像
npm config set registry https://registry.npm.taobao.org

2:安装依赖
npm install

3:运行开发服务器(http://localhost:3000/)
npm run start

4:公共组件写在/src/components/

5:私有页面组件写在/src/containers/yourName/
```
  ,
  "proxy":{
    "/api":{
      "target":"http://192.168.210.31:10700",
      "pathRewrite":{"^/api":""}
    }

  }
## 添加新功能(页面)开发
```
1:在/src/containers/app/index.js中添加相应的路由
<Route exact path="/yourPath" component={YourComponent} />

2:在/src/containers/文件夹下面添加文件夹(yourName),参考home

3:执行 npm run start
```

## CSS模块
```
1:使用precss插件来实现CSS变量，嵌套使用等功能。
2:/public/static/css/common.css中存放一些全局的CSS变量和CSS类。
3:每个页面，组件都建立自己的css文件。(home.css为例)
    在header.css中通过@import "/static/css/common.css"的方式导入common.css;
```

## Redux的使用
```
1:在/src/modules/下面建立相关的文件，action和redux写在同一个文件。
    参考/src/modules/home.js
2:修改/src/modules/index.js文件，
    参考home的写法
```