const fs = require('fs');
const path = require('path');

// 把当前js所在的目录中的a.html文件的路径赋值给 fileName
let fileName = path.join(__dirname, 'a.html');

// 读取a.html文件，按照utf8的编码方式读取。回调函数第一个参数是err(这个是一个默认的约定规范，大多数node
// 的回调函数第一个参数都是异常的err，如果为空则表示没有错误。)第二个参数是文件的所有内容。
fs.readFile(fileName, { encoding: 'utf8' }, (err, data) => {
  if (err) throw err; // 判断是否读取错误
  console.log(data); // 文件内容读取并打印到控制台。
});

//readFileSync方法是readFile的同步版本，没有回调函数，函数的返回值就是文件内容。
// 以下代码是同步读取，不使用回调函数，此方法不是用的： libuv 的线程池的线程执行，所以慎用！！
let fileContent = fs.readFileSync(fileName, { encoding: 'utf8' });
console.log(fileContent);
