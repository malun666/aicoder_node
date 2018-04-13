// const http = require('http');
// let server = http.createServer((req, res) => {
//   console.log(req.url);
//   res.writeHead(200, {
//     'Content-Type': 'text/plain',
//     Auth: 'ACD09C0946736AABFFD'
//   });
//   res.write('hi, from aicoder.com');
//   res.end();
// });

// server.listen(60005);

// 获取get请求的数据
// const http = require('http');
// const url = require('url');
// const util = require('util');

// http
//   .createServer((req, res) => {
//     //利用url模块去解析客户端发送过来的URL
//     res.write(util.inspect(url.parse(req.url, true)));
//     res.end();
//   })
//   .listen(8080);

// 获取post请求数据
const http = require('http');
const util = require('util');
const querystring = require('querystring');

http
  .createServer((req, res) => {
    let post = '';
    req.on('data', chunk => {
      post += chunk;
    });
    req.on('end', () => {
      post = querystring.parse(post);
      res.end(util.inspect(post));
    });
  })
  .listen(60004);
