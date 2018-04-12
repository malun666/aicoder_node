const fs = require('fs');
const path = require('path');

// 把当前js所在的目录中的a.html文件的路径赋值给 fileName
let fileName = path.join(__dirname, 'msg.log');

// 创建议文件的可写流。
let ws = fs.createWriteStream(fileName, { start: 0 });

ws.on('open', function(fd) {
  console.log('要写入的数据文件已经打开，文件描述符是： ' + fd);
});

ws.on('error', err => {
  console.log(err);
});

ws.on('finish', () => {
  console.log('写入结束！');
});

for (let i = 0; i < 10000; i++) {
  // write方法可以把内容写入到可写流中。
  let w_flag = ws.write('aicoder.com  全栈实习 \r\n');
  //当缓存区写满时，输出false
  console.log(w_flag);
}
ws.end('结束写入！');
