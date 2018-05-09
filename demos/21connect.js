const http = require('http');
const connect = require('connect');
const util = require('util')

let app = connect();

app.use((req, res, next) => {
  // 打印请求信息
  console.log(req.method)
  console.log(req.headers)
  console.log(req.url)
  console.log(util.inspect(req))

  // 返回响应的信息
  res.end('abcdefghigia, aicoder.com');
  next();
});

app.use('/index.html', (req, res, next) => {
  next();
})

app.use((error, req, resp, next) => {
  console.log(error);

});


app.listen(58889, () => {
  console.log('服务器启动，http://127.0.0.1:58889')
})
