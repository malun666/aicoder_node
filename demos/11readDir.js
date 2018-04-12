const fs = require('fs');
const path = require('path');

// 读取文件夹
fs.readdir(__dirname, function(err, files) {
  if (err) {
    console.error(err);
    return;
  }
  // 对文件夹中的所有路径做处理
  files.forEach(file => {
    let filePath = path.join(__dirname, file);
    // 读取文件的信息，判断是文件还是路径
    fs.stat(filePath, function(err, stat) {
      if (err) throw err;
      console.log(filePath, stat.isFile() ? ' is: file' : ' is: dir');
    });
  });
});
