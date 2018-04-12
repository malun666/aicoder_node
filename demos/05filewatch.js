// 引入fs模块
const fs = require('fs');

// 通过fs.watch方法可以创建一个fs.FSWatcher类的实例。
let watcher = fs.watch(
  __dirname, // 监控的文件夹，我这里用了一个模块的变量，当前js文件所在的目录
  { recursive: true }, // 是否监控子文件夹，还可以设置编码，具体参考官网文档
  (eventName, fileName) => {
    // 回调函数接受两个参数：事件名字和文件名
    console.log(`事件名字：${eventName}, 文件名字： ${fileName}`);
  }
);

// 还可以单独注册事件，回调函数跟watch方法一致。还可以监听：error事件。
watcher.on('change', (eventType, fileName) => {
  console.log('事件名：%s , 文件名： %s', eventType, fileName);
});

// 设置13秒中后，退出监控文件夹
setTimeout(() => {
  // 关闭监控。
  watcher.close(function(err) {
    if (err) {
      console.error(err);
    }
    console.log('关闭watch');
  });
}, 13000);
