const path = require('path');

console.log(path.dirname('/etc/h/a.html')); // => /etc/h
console.log(path.extname('/etc/h/a.html')); // => .html

let p = path.format({
  dir: '/users/home/aicoder',
  base: 'a.html'
});

console.log(p); // => /users/home/aicoder/a.html

let pathObj = path.parse(p);
console.dir(pathObj);

// 合并路径：当前js文件
console.log(path.join('/users/home/aicoder', __filename));
