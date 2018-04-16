const dgram = require('dgram');
const client = dgram.createSocket('udp4');

client.on('close', () => {
  console.log('socket已关闭');
});

client.on('error', err => {
  console.log('===>', err);
});
client.on('listening', () => {
  console.log('socket正在监听中...');
});

client.on('message', (msg, rinfo) => {
  console.log(`client => receive :${msg} from ${rinfo.address}:${rinfo.port}`);
});
client.bind(48061);

setInterval(() => {
  var msg = Buffer.from('你好');
  console.log('发送消息');
  // client.send(msg, 58060, '192.168.0.104');
  var msg = Buffer.from('大家好啊，我是client.');
  client.send(msg, 0, msg.length, 58060, '192.168.0.104');
}, 1500);
