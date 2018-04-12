const fs = require('fs');
const path = require('path');

let fileNameSrc = path.join(__dirname, 'jdk.dmg');
let fileNameDist = path.join(__dirname, 'jdk1.dmg');

let rs = fs.createReadStream(fileNameSrc, { start: 0 });
let ws = fs.createWriteStream(fileNameDist, { start: 0 });

// 方式一： 事件暂停和继续
// rs.on('data', function(chunk) {
//   if (ws.write(chunk) === false) {
//     // 判断数据流是否已经写入目标了
//     rs.pause();
//   }
// });

// // 当可读流结束的时候，让可写流结束。
// rs.on('end', function() {
//   ws.end(); // 结束可写流
//   console.log('文件复制成功');
// });

// ws.on('drain', function() {
//   rs.resume(); // 继续启动读取数据流
// });

// 方式二：自动化流管道的方式
rs.on('end', () => {
  console.log('读取完毕');
});
ws.on('finish', () => {
  console.log('写入成功！');
});
rs.pipe(ws);
