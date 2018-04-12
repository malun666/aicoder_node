const fs = require('fs');
const path = require('path');

// 把当前js所在的目录中的a.html文件的路径赋值给 fileName
let fileName = path.join(__dirname, 'a.html');

// 写入文件
fs.writeFile(
  fileName,
  '<h1>aicoder.com 全栈实习不8000就业不还实习费</h1>',
  err => {
    if (err) throw err;
    console.log('文件内容已经写入！');
  }
);
