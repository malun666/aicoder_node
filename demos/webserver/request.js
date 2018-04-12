'use strict';

const EventEmitter = require('events');

class Request extends EventEmitter {
  constructor(client) {
    super();
    this.requestURL = '';
    this.requestHeaders = [];
    this.query = {};
    this.body = {};
    this.cookie = {};
    this.method = 'GET';
    this.init(client);
  }

  init(client) {
    let self = this;
    // 客户端发送来请求后，对请求进行解析。
    client.on('data', reqStr => {
      reqStr = reqStr.toString();
      let tempArr = reqStr.split('\r\n');
      for (let index = 0; index < tempArr.length; index++) {
        let item = tempArr[index];
        if (index === 0) {
          // 解析请求头的第一行协议和地址
          let HeadLineArr = item.split(' ');
          self.method = HeadLineArr[0];
          self.requestURL = HeadLineArr[1];
          self.requestHTTPVersion = HeadLineArr[2];
        } else {
          // 到空行的时候结束解析
          if (item === '') {
            break;
          }
          let tempArr = item.split(':');
          // 解析http的头部的key-value
          self.requestHeaders.push({
            key: tempArr[0],
            value: tempArr[1].slice(1)
          });
        }
      }

      self.emit('loaded');
    });
  }
}

module.exports = Request;
