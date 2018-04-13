# http模块

[Ryan Dahl](https://github.com/ry)开发node的初衷就是：把`Nginx`非阻塞IO功能和一个高度封装的WEB服务器结合在一起的东东。所以Node初衷就是为了高性能的Web服务器去的，所以：Node的HTTP模块也是核心的核心。

本文需要您了解的前置知识点：

+ HTTP协议
+ Web请求模型：请求→处理→响应
+ Node的流、事件

## http模块的客户端

要使用 HTTP 服务器与客户端，需要 `require('http')`模块。http模块提供了两个函数`http.request()`和`http.get()`,帮助程序向服务器端发送请求。

我们可以通过`http.request
()`方法创建一个发送请求的`http.ClientRequest`类实例，请求创建后，并不会立即发送请求，我们还可以继续访问请求头：`setHeader(name, value)`、`getHeader(name)` 和 `removeHeader(name)` API 进行修改。实际的请求头会与第一个数据块一起发送或当调用 `request.end()` 时发送。

`http.ClientRequest`类继承了`EventEmitter`,它内部定义了以下事件。

事件|说明
---|---
'abort' |当请求已被客户端终止时触发。 该事件仅在首次调用 abort() 时触发。
'connect' |每当服务器响应 CONNECT 请求时触发。 如果该事件未被监听，则接收到 CONNECT 方法的客户端会关闭连接。
'continue' |当服务器发送了一个 100 Continue 的 HTTP 响应时触发，通常是因为请求包含 Expect: 100-continue。 这是客户端将要发送请求主体的指令。
'response' |当请求的响应被接收到时触发。 该事件只触发一次。如果没有添加 'response' 事件处理函数，则响应会被整个丢弃。 如果添加了 'response' 事件处理函数，则必须消耗完响应对象的数据，可通过调用 response.read()、或添加一个 'data' 事件处理函数、或调用 .resume() 方法。 数据被消耗完时会触发 'end' 事件。 在数据被读取完之前会消耗内存，可能会造成 'process out of memory' 错误。
'socket' |当 socket 被分配到请求后触发。
'timeout'|当底层 socket 超时的时候触发。该方法只会通知空闲的 socket。请求必须手动停止。
'upgrade' |每当服务器响应 upgrade 请求时触发。 如果该事件未被监听，则接收到 upgrade 请求头的客户端会关闭连接。

`http.ClientRequest`类还提供了一些方法供我们进行请求和返回响应的处理。

方法|参数|说明
---|---|---
`request.end([data[, encoding]][, callback])`|①`data`发送的数据  ②`encoding`编码 ③callback回调函数|结束发送请求。如果部分请求主体还未被发送，则会刷新它们到流中。如果请求是分块的，则会发送终止字符 '0\r\n\r\n'。如果指定了 data，则相当于调用 request.write(data, encoding) 之后再调用 request.end(callback)。如果指定了 callback，则当请求流结束时会被调用。
`request.flushHeaders()`|无|刷新请求头。出于效率的考虑，Node.js 通常会缓存请求头直到 request.end() 被调用或第一块请求数据被写入。 然后 Node.js 会将请求头和数据打包成一个单一的 TCP 数据包。
`request.getHeader(name)`|①name ②返回字符串 |读出请求头，注意:参数name是大小写敏感的
`request.removeHeader(name)`|name 字符串|移除一个已经在 headers 对象里面的 header。
`request.setHeader(name, value)`|①name是header的key②value|为 headers 对象设置一个单一的 header 值。如果该 header 已经存在了，则将会被替换。这里使用一个字符串数组来设置有相同名称的多个 headers。
`request.setSocketKeepAlive([enable][, initialDelay])`|①enable类型boolean②initialDelay|
一旦 socket 被分配给请求且已连接，socket.setKeepAlive() 会被调用。
`request.setTimeout(timeout[, callback])`|①timeout请求被认为是超时的毫秒数。②callback 可选的函数,当超时发生时被调用。|等同于绑定到 timeout 事件。一旦socket被分配给请求且已连接，socket.setTimeout() 会被调用。
`request.write(chunk[, encoding][, callback])`|①chunk发送的请求数据。②encoding：编码；③callback回调函数|发送请求主体的一个数据块。 通过多次调用该方法，一个请求主体可被发送到一个服务器，在这种情况下，当创建请求时，建议使用 ['Transfer-Encoding', 'chunked'] 请求头。

下面是一个发送GET请求的demo

```js
// 引入http模块
const http = require('http');

// 创建一个请求
let request = http.request(
  {
    protocol: 'http:',     // 请求的协议
    host: 'aicoder.com',   // 请求的host
    port: 80,              // 端口
    method: 'GET',         // GET请求
    timeout: 2000,         // 超时时间
    path: '/'              // 请求路径
  },
  res => {  // 连接成功后，接收到后台服务器返回的响应，回调函数就会被调用一次，跟response事件一致。
    // res => http.IncomingMessage : 是一个Readable Stream
    res.on('data', data => {
      console.log(data.toString('utf8')); // 打印返回的数据。
    });
  }
);

// 设置请求头部
request.setHeader('Cache-Control', 'max-age=0');


// 真正的发送请求
request.end();
```


且看一个发送post请求的例子。

```js
const http = require('http');

let request = http.request(
  {
    protocol: 'http:',
    host: 'aicoder.com',
    port: 80,
    method: 'POST',
    timeout: 2000,
    path: '/'
  },
  res => {
    res.on('data', data => {
      console.log(data.toString('utf8'));
    });
  }
);
// 发送请求的数据。
request.write('id=3&name=aicoder');
request.end();

```

待续....

---

[老马免费视频教程](https://qtxh.ke.qq.com)

[返回首页](../readme.md)
