const http = require('http');

// post 请求
// let request = http.request(
//   {
//     protocol: 'http:',
//     host: 'aicoder.com',
//     port: 80,
//     method: 'POST',
//     timeout: 2000,
//     path: '/'
//   },
//   res => {
//     res.on('data', data => {
//       console.log(data.toString('utf8'));
//     });
//   }
// );

// request.setHeader('Cache-Control', 'max-age=0');
// request.write('id=3&name=aicoder');
// request.end();

// get 请求
// let request = http.request(
//   {
//     protocol: 'http:',
//     host: 'aicoder.com',
//     port: 80,
//     method: 'GET',
//     timeout: 2000,
//     path: '/'
//   },
//   res => {
//     res.on('data', data => {
//       console.log(data.toString('utf8'));
//     });
//   }
// );

// request.setHeader('Cache-Control', 'max-age=0');
// request.end();

http.get('http://aicoder.com', res => {
  res.on('data', data => {
    console.log(data.toString('utf8'));
  });
});
