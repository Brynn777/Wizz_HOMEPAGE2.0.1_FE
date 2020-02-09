# wizz官网页面

> 一个学生组织的官网展示+后台管理页面，实现基本展示，动态管理

技术栈：
逻辑框架：Vue
组件库：Ant-Design-Vue
HTTP: axios
云服务：qiniu
其他：
    Vue Router/NProgress/lodash管理路由，实现一定程度的交互体验和安全性
    

# 基本使用

``` bash
## 安装依赖
npm install

## 项目启动
npm run dev

## 项目打包
npm run build

# 后端联调

## 开发环境
使用Webpack的proxyTable在本地开一个虚拟服务器代理转发所有/api开头的ajax请求解决跨域
如需更改服务器请在config/index.js中修改api

## 生产环境
注释src/api/url.js中proess.env.API_PATH
替换成真实服务器地址



