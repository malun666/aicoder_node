const express = require('express')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

let app = express();
let upload = multer({
  dest: path.join(__dirname, 'public/upload')
})

app.use(express.static(path.join(__dirname, 'public')));

// upload的single方法设置上传的 input标签的name属性
// 可以通过req的file拿到当前文件
app.post('/upload', upload.single('fa'), (req, res) => {
  // console.log(req.file.path)
  console.dir(req.file) // file对象的内容如下：
  // { fieldname: 'fa',
  // originalname: '支付.png',
  // encoding: '7bit',
  // mimetype: 'image/png',
  // destination: '/Users/flydragon/Desktop/work/gitdata/nodedemos/demos/public/upload',
  // filename: 'f062ffd7339f6fd017c5b82ecb8f123e',
  // path: '/Users/flydragon/Desktop/work/gitdata/nodedemos/demos/public/upload/f062ffd7339f6fd017c5b82ecb8f123e',
  // size: 77959 }

  fs.rename(req.file.path, path.join(__dirname, 'public/upload/', req.file.originalname));
  res.send({
    status: 1,
    msg: 'ok'
  });
});

app.listen(59988, () => {
  console.log('http://127.0.0.1:59988')
})
