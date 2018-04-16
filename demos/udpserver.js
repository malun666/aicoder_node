const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('close', () => {
  console.log('socket已关闭');
});

server.on('error', err => {
  console.log(err);
});

server.on('listening', () => {
  console.log('socket正在监听中...');
});

server.on('message', (msg, rinfo) => {
  console.log(`receive :${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.bind('58060', '192.168.0.104', () => {
  server.setBroadcast(true); //开启广播
  // server.setTTL(128);
  setInterval(() => {
    console.log('发送消息');
    var msg = Buffer.from('大家好啊，我是服务端.');
    server.send(msg, 0, msg.length, 48061, '192.168.0.255');
  }, 1500);
});
