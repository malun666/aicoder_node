const express = require('express');
const path = require('path');
const artTmpl = require('express-art-template');
const service = require('./db_service.js')

const bodyParser = require('body-parser');
const multer = require('multer');
const User = require('./model/user.js');

let app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

let upload = multer({
  dest: path.join(__dirname, 'public/upload')
})

// 设置静态路由地址
app.use(express.static(path.join(__dirname, 'public')));

// 设置 模板引擎为art-template
app.engine('art', artTmpl);
// 设置模板的目录
app.set('views', path.join(__dirname, 'views'));

// 主页面，用户列表
app.get('/', function (req, res) {
  var page = parseInt(req.query.page) || 1;
  var rows = parseInt(req.query.rows) || 10;
  res.render('userList.art', service.getPageUsers(page, rows));
});

// 显示添加用户页面
app.get('/user/add', (req, res) => {
  res.render('useradd.art');
});

app.post('/user/add', (req, res) => {
  service.addUser(req.body);
  // console.log(req.body);
  res.redirect('/');
});

// 删除用户
app.get('/user/delete', (req, res) => {
  if (req.query.id) {
    return res.json(service.delUser(parseInt(req.query.id)));
  }
  res.json({
    status: 0,
    msg: '删除失败，id参数不符合规范！'
  });
});

// 修改用户信息
app.get('/user/update', (req, res) => {
  if (!req.query.id) {
    res.redirect('/');
    return;
  }

  let ret = service.getUserById(parseInt(req.query.id));
  res.render('userupdate.art', ret.user);
});

app.post('/user/update', (req, res) => {
  let user = new User();
  Object.assign(user, req.body);
  if (service.updateUser(user).status == 1) {
    res.redirect('/');
    return;
  }
  res.render('userupdate.art', req.body);
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

app.listen(59000, () => {
  console.log('http://127.0.0.1:59000');
});
