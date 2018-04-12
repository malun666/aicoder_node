const net = require('net');

// 创建连接到服务器的客户端
let client = net.createConnection('60003', '127.0.0.1', () => {
  client.write('Hi， client, for aicoder.com');
  console.log('连接上服务器端！');
});

client.on('error', err => {
  console.log(err);
});

client.on('end', () => {
  console.log('结束连接！');
});

client.on('close', () => {
  console.log('退出');
});

client.on('data', data => {
  console.log('收到数据： %s', data);
});
