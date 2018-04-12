const net = require('net');
const path = require('path');
const fs = require('fs');

// 创建服务器端的
const server = net.createServer();

// 监听异常错误事件
server.on('error', err => {
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
    let fileName = path.join(__dirname, 'b.html');
    let ws = fs.createWriteStream(fileName);
    ws.write(data, 'utf8');
  });

  // 向客户端发送数据
  clientSocket.write('Hi, aicoder.com ');
});

// 服务器开始监听60003端口（端口：0-65535之间的一个值）
server.listen(60003, () => {
  console.log('opened server on', server.address());
});

// 以下是客户端代码

const client = net.createConnection(60003, '127.0.0.1', () => {
  console.log('连接上服务器端！');
  let fileName = path.join(__dirname, 'a.html');
  let rs = fs.createReadStream(fileName, { encoding: 'utf8' });
  rs.pipe(client);
});
