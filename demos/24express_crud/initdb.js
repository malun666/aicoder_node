const fs = require('fs');
const Mcok = require('mockjs');
const path = require('path');

let dbjson = initUsers();

fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(dbjson), {
  encoding: 'utf8'
});
console.log('写入成功！')

function initUsers() {
  return Mcok.mock({
    'users|33': [{
      'id|+1': 10000,
      'name': '@cname',
      'phone': '@natural(13200000000, 18999999999)',
      'email': '@email',
      'address': '@county(true)',
      'zip': '@zip',
      'birthday': '@date("yyyy-MM-dd")'
    }]
  });
}
