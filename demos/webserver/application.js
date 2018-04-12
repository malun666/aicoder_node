'use strict';

const path = require('path');
const net = require('net');
const fs = require('fs');
const EventEmitter = require('events');

const Request = require('./request.js');
const Response = require('./response.js');
const Context = require('./context.js');

class Application extends EventEmitter {
  constructor(opt) {
    super(opt);
    this._webServer = null;
  }

  /**
   * 服务器初始化，在Application的构造函数内部调用
   * @memberof Application
   */
  init() {
    // 触发预初始化事件
    this.emit('preInit');

    this._webServer = net.createServer(client => {
      console.log('客户端连接上：', client.remoteAddress);
      this.processRequest(client);
    });
    this._webServer.on('error', err => {
      console.log('服务器异常：', err);
    });
    this._webServer.on('close', () => {
      console.log('服务器端结束服务。');
    });

    // 初始化事件
    this.emit('init');
  }

  /**
   * 启动应用程序，并开始接受请求
   * @memberof Application
   */
  start() {
    // 初始化服务器
    this.init();
    this._webServer.listen(process.env.PORT || 60002, () => {
      console.log('服务器开始监听端口：%d', process.env.PORT || 60002);
    });
  }

  processRequest(client) {
    let req = new Request(client);
    let res = new Response(client);
    let ctx = new Context();
    // 处理req
    this.PR(req, res, ctx);
    // 返回响应的res
  }

  PR(req, res, ctx) {
    req.on('loaded', () => {
      // 已经加载请求完成，处理当前请求。
      // console.log(req);
      let filePath = path.join(__dirname, 'web/', req.requestURL);
      fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
          res.writeHead(200);
          // 返回响应内容
          fs.createReadStream(filePath).pipe(res);
        } else {
          res.writeHead(400);
          res.end('404 not found！');
        }
      });
    });
  }
}

module.exports = Application;
