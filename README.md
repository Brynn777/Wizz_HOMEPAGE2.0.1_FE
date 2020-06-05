# 为之工作室官网

> 为之工作室的展示与后台管理系统
    

# 基本说明

## 技术栈：

逻辑框架：Vue

组件库：Ant-Design-Vue

HTTP: Axios

云服务：qiniu

其他：

    Vue Router/NProgress/lodash

## 部署

```bash
## 下载
git clone ...
```

将dist文件夹下面的所有内容放到服务器上对应位置

## 使用

![展示页](https://github.com/Brynn777/Wizz_HOMEPAGE2.0.1_FE/blob/master/1.png)

![后台管理页](https://github.com/Brynn777/Wizz_HOMEPAGE2.0.1_FE/blob/master/2.png)

## 修改webpack配置   



``` bash
## 安装依赖
npm install

## 启动项目:运行在8080端口(可以把config/index.js中autoOpenBrowser修改为true)
npm run dev

## 线上环境使用前打包，生成的文件在dist目录下
npm run build

```

### 跨域配置

在config/dev.env.js中(开发环境下的baseUrl为localhost/api)
> 使用Webpack的proxyTable在本地开一个虚拟服务器代理转发所有/api开头的ajax请求解决跨域


```javascript
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_PATH: '"/api"'//本地
})

```

在config/pro.env.js中（生产环境下的baseUrl）

```javascript
module.exports = {
  NODE_ENV: '"production"',
  API_PATH: '"https://homepage.backend.wizzstudio.com"'//真实服务器IP
}
```

在config/index.js中添加proxyTable。

在开发环境下，将向本机的http请求代理转发到真实的服务器

`api/xxx`->`https://homepage.backend.wizzstudio.com/xxx`

```
proxyTable: {
      '/api': {
      target: 'https://homepage.backend.wizzstudio.com',//目标主机
          changeOrigin: true,//跨域
          pathRewrite: {
              '^/api': ''
              //不用重写，接口不是全部带api
          }
      }
},
```

在代码中baseUrl以process.env.API_PATH表示，会根据所处环境改变其值

```javascript
let api = process.env.API_PATH;
let PUSH_MESSAGE = `${api}/xxx`
```

