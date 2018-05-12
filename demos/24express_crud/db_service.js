const fs = require('fs');
const path = require('path');

let jsondata = require('./db.json');

let dbfile = path.join(__dirname, 'db.json');

function _save(db) {
  fs.writeFileSync(dbfile, JSON.stringify(db), {
    encoding: 'utf8'
  });
}

exports.getUserById = function (id) {
  if (typeof (id) !== 'number' || id < 0) {
    return {
      status: 0,
      msg: '参数不符合规范。'
    }
  }

  return {
    user: jsondata.users.find(a => a.id === id),
    status: 1,
    msg: 'ok'
  };
}

// 获取所有的用户数据
exports.getUsers = function () {
  return jsondata.users || [];
};

exports.getPageUsers = function (page, rows) {
  let start = (page - 1) * rows;
  let end = rows + start;
  console.log(start, end);
  return {
    users: jsondata.users.slice(start, end),
    count: jsondata.users.length + 1,
    curr: page,
    rows: rows
  };
}

// 添加用户数据
exports.addUser = function (user) {
  if (!user) {
    return {
      status: 0,
      msg: '用户不能为空'
    };
  }
  jsondata.users = jsondata.users || [];
  user.id = Date.now();
  jsondata.users.push(user);
  _save(jsondata);
  return user;
}

exports.delUser = function (id) {
  if ((typeof (id) !== 'number') || id < 0) {
    return {
      status: 1,
      msg: 'id必须是正数，而且大于0'
    }
  }
  if (jsondata.users && jsondata.users.length > 0) {
    let index = jsondata.users.findIndex(item =>
      item.id === id);
    console.log('type: %s id: %d', typeof (id), id);
    console.log(index);
    if (index < 0) {
      return {
        status: 2,
        msg: '未删除任何数据。要删除的数据不存在！'
      }
    }
    jsondata.users.splice(index, 1);
    _save(jsondata);
    return {
      status: 1,
      msg: '删除成功'
    }
  }

  return {
    status: 0,
    msg: '删除失败,未删除任何数据！'
  }
};

exports.updateUser = function (user) {
  if (!user || typeof (user) !== 'object' || typeof (user.id) !== 'number') {
    return {
      status: 0,
      msg: '要修改的数据格式不规范！'
    };
  }

  let index = jsondata.users.findIndex(item => item.id === user.id);
  if (index < 0) {
    return {
      status: 0,
      msg: '没有找到要修改的数据!'
    };
  }

  jsondata.users.splice(index, 1, Object.assign({}, jsondata.users[index], user));

  _save(jsondata);
  return {
    msg: '修改成功！',
    status: 1,
    data: user
  }
}
