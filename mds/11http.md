# http模块

[Ryan Dahl](https://github.com/ry)开发node的初衷就是：把`Nginx`非阻塞IO功能和一个高度封装的WEB服务器结合在一起的东东。所以Node初衷就是为了高性能的Web服务器去的，所以：Node的HTTP模块也是核心的核心。

本文需要您了解的前置知识点：

+ HTTP协议
+ Web请求模型：请求→处理→响应
+ Node的流、事件

## http模块的客户端

要使用 HTTP 服务器与客户端，需要 `require('http')`模块。http模块提供了两个函数`http.request()`和`http.get()`,帮助程序向服务器端发送请求。

我们可以通过`http.request()`方法创建一个发送请求的`http.ClientRequest`类实例，请求创建后，并不会立即发送请求，我们还可以继续访问请求头：`setHeader(name, value)`、`getHeader(name)` 和 `removeHeader(name)` API 进行修改。实际的请求头会与第一个数据块一起发送或当调用 `request.end()` 时发送。

`http.ClientRequest`类继承了`EventEmitter`,它内部定义了以下接口。

事件|说明
---|---
'abort' 事件|当请求已被客户端终止时触发。 该事件仅在首次调用 abort() 时触发。
'connect' 事件|每当服务器响应 CONNECT 请求时触发。 如果该事件未被监听，则接收到 CONNECT 方法的客户端会关闭连接。


待续....

---

[老马免费视频教程](https://qtxh.ke.qq.com)

[返回首页](../readme.md)
