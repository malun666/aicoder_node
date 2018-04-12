const net = require('net');
const fs = require('fs');

let webServer = net.createServer(client => {
  console.log('客户端连接上：', client.remoteAddress);

  initRequest(client);
});

webServer.listen(process.env.PORT || 60002, () => {
  console.log('服务器开始监听端口：%d', process.env.PORT || 60002);
});

function initRequest(client) {
  let i = 0;
  client.on('data', data => {
    i++;
    console.log('开始处理请求数据！');
    console.log('%d', i, data.toString());
    client.write(`HTTP/1.1 200 OK
Date: Mon, 09 Apr 2018 01:52:22 GMT
Cache-Control: public, max-age=0, must-revalidate
Connection: keep-alive
Server: Netlify
Vary: Accept-Encoding


    <html>
      <head>
        <title>你好</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1>还好ADSL福建省多了几分善大佬思路大家法律手段甲方</h1>
      </body>
    </html>
    `);
    client.end('');
  });
  client.on('end', () => {
    console.log('客户端退出！');
  });
  client.on('close', () => {
    console.log('客户端退出！');
  });

  client.on('error', err => {
    console.log(err);
  });
}
