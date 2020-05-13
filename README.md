# 【全栈之旅】Node.js + Vue.js(typescript) + koa.js + mysql 开发web应用示例

安装 cnpm
  ```shell
    npm install -g cnpm --registry=https://registry.npm.taobao.org
  ```
如不安装可修改`client` AND `server`目录下package.json的scripts命令，将`cnpm install`修改为`npm install`即可

### 本地运行
 - 需要安装mysql
 - 需要安装node.js
 
#### 启动客户端并自动安装依赖
```
  cnpm run client
```
#### 启动服务端并自动安装依赖
```
  cnpm run server
```
#### 启动双端并自动安装双端依赖
```
  cnpm run start
```