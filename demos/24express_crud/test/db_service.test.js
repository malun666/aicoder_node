require('../initdb.js');

const service = require('../db_service.js')
const should = require('should');

console.log('开始测试！')
describe('db_server 测试用户数据', function () {
  describe('#getUsers 测试获取用户所有数据', function () {
    it('service.getUsers() should be Array', function () {
      should(service.getUsers()).be.a.Array();
    });
  })
  describe('#getPageUsers 测试获取分页数据', function () {
    it('service.getPageUsers(2, 5) should return Array[]', function () {
      let data = service.getPageUsers(2, 5);
      // should(users).be.a.Object();
      (data.users.length <= 5).should.be.true();
    });
  });
  describe('#addUser #delUser 测试添加数据，并测试删除添加的数据', function () {
    // 添加数据

    it(`service.addUser({...}) should return ok`, function () {
      // let users = service.getPageUsers(2, 5);
      let addUser = {
        "name": "laoma",
        "phone": 15424997528,
        "email": "k.gjrdsvtk@pvevae.na",
        "address": "重庆 重庆市 南岸区",
        "zip": "726898",
        "birthday": "2001-02-28"
      };
      let returnUser = service.addUser(addUser);
      returnUser.should.containEql(addUser);
      // 清理数据
      let returnMsg = service.delUser(returnUser.id);
      returnMsg.should.be.eql({
        status: 1,
        msg: '删除成功'
      });
      // 测试添加空数据
      service.addUser(null).should.be.eql({
        status: 0,
        msg: '用户不能为空'
      });
    });
  });

  describe('#delUser 测试删除数据', function () {
    it('server.delUser(非法类型) should del userinfo of id 1', function () {
      service.delUser(null).should.be.eql({
        status: 1,
        msg: 'id必须是正数，而且大于0'
      }, '删除null测试');
      service.delUser('234444').should.be.eql({
        status: 1,
        msg: 'id必须是正数，而且大于0'
      }, '删除id为字符串测试 ');
    });
    it('service.del(id) shold be ok', function () {
      let addUser = {
        "name": "laoma",
        "phone": 15424997528,
        "email": "k.gjrdsvtk@pvevae.na",
        "address": "重庆 重庆市 南岸区",
        "zip": "726898",
        "birthday": "2001-02-28"
      };
      let returnUser = service.addUser(addUser);
      returnUser.should.containEql(addUser);
      // 清理数据
      let returnMsg = service.delUser(returnUser.id);
      returnMsg.should.be.eql({
        status: 1,
        msg: '删除成功'
      });
    });
  })

  describe('#updateUser 测试修改用户数据', function () {
    it('update({})', function () {
      let user = service.getUsers()[0];
      let newUser = Object.assign({}, user, {
        phone: 110
      });
      let returnMsg = service.updateUser(newUser);
      returnMsg.should.be.eql({
        msg: '修改成功！',
        status: 1,
        data: newUser
      });

      service.updateUser(user); // 擦除修改影响
    });

    it('修改空数据，非法数据测试', function () {
      service.updateUser(null).should.be.eql({
        status: 0,
        msg: '要修改的数据格式不规范！'
      });
      service.updateUser("").should.be.eql({
        status: 0,
        msg: '要修改的数据格式不规范！'
      });
      service.updateUser({
        id: -9
      }).should.be.eql({
        status: 0,
        msg: '没有找到要修改的数据!'
      });
    });
  });
});
