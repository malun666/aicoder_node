const express = require('express');
const util = require('util')

let app = express();

// app默认可以当connect中间件用
app.use('/', function (req, res, next) {
  console.log(req.headers)
  console.log(util.inspect(req, {
    depth: 0
  }));
  next();
});

// all可以处理所有的请求
app.all('*', function (req, res, next) {
  console.log('ss')
  next();
});
app.get('/', function (req, res, next) {
  console.log(3)
  next();
})
// get  post 等方法，处理对应的请求
app.get('/', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8;'
  })
  res.write('<h1>你好久的搜救防守打法就爽肤水来得及</h1>');
  res.end();
});

app.listen(45000);
