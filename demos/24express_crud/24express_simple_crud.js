const express = require('express');
const path = require('path');
const artTmpl = require('express-art-template');
const service = require('./db_service.js')
let app = express();

// 设置静态路由地址
app.use(express.static(path.join(__dirname, 'public')));

// 设置 模板引擎为art-template
app.engine('art', artTmpl);
// 设置模板的目录
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
  var page = parseInt(req.query.page) || 1;
  var rows = parseInt(req.query.rows) || 10;
  res.render('userList.art',
    service.getPageUsers(page, rows)
  );
});

app.get('/user/add', (req, res) => {
  res.render('useradd.art');
});

// Express 返回json的数据
app.get('/api/user', function (req, res) {
  var page = parseInt(req.query.page) || 1;
  var rows = parseInt(req.query.rows) || 10;
  res.json({
    msg: 'ok',
    status: 1,
    data: service.getPageUsers(page, rows)
  });
});


app.listen(59000);
