const fs = require('fs');
const path = require('path');

// 把当前js所在的目录中的a.html文件的路径赋值给 fileName
let fileName = path.join(__dirname, 'a.html');

// 创建可读流
let readStream = fs.createReadStream(fileName, {
  flags: 'r', // 设置文件只读模式打开文件
  encoding: 'utf8' // 设置读取文件的内容的编码
});

// 打开文件流的事件。
readStream.on('open', fd => {
  console.log('文件可读流已打开，句柄：%s', fd);
});

// 可读流打开后，会源源不断的触发此事件方法，回调函数参数就是读取的数据。
readStream.on('data', data => {
  console.log(data);
});

readStream.on('close', () => {
  console.log('文件可读流结束！');
});

// 打印内存占用情况
function printMemoryUsage() {
  var info = process.memoryUsage();
  function mb(v) {
    return (v / 1024 / 1024).toFixed(2) + 'MB';
  }
  console.log(
    'rss=%s, heapTotal=%s, heapUsed=%s',
    mb(info.rss),
    mb(info.heapTotal),
    mb(info.heapUsed)
  );
}
setInterval(printMemoryUsage, 1000);
