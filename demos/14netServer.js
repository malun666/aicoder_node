const net = require('net');

// 创建服务器端的
const server = net.createServer();

// 监听异常错误事件
server.on('error', err => {
  // throw err;
  console.log(err);
});

// 监听客户端的连接事件，客户端连接上后，会自动执行回调函数，回调函数的参数就是指向客户端的socket
server.on('connection', clientSocket => {
  console.log('客户端：%s', clientSocket.remoteAddress);

  // 监听此客户端的end事件。
  clientSocket.on('end', () => {
    console.log('client disconnected');
  });

  // 监听此客户端发送数据的事件。
  clientSocket.on('data', data => {
    console.log('收到数据：%s', data);
  });

  // 向客户端发送数据
  clientSocket.write('Hi, aicoder.com ');

  // 2s后让客户端退出
  setTimeout(() => {
    // 通知客户端退出，并发送数据。
    clientSocket.end('bye！');
  }, 2000);
});

// 服务器开始监听60003端口（端口：0-65535之间的一个值）
server.listen(60003, () => {
  console.log('opened server on', server.address());
});

// 以下为关闭监听的实例
// setTimeout(() => {
//   console.log('服务器端退出！！！');
//   server.close();
// }, 5000);
