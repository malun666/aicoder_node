'use strict';

const fs = require('fs');
const net = require('net');
const { Writable } = require('stream');

class Response extends Writable {
  constructor(client) {
    super();
    this.clientSocket = client;
    // this.on('end', () => {
    //   this.clientSocket.end();
    // });

    this.on('pipe', src => {
      console.log('pipe');
    });

    this.on('finish', () => {
      this.clientSocket.end();
    });
  }
  writeHead(num) {
    // this.write(this._getNumHeader(200));
    this.clientSocket._write(this._getNumHeader(200), null, () => {});
    // var t = this._getNumHeader(200);
    // console.log(t);
    // this.clientSocket.write(t);
  }

  _getNumHeader(num) {
    var strHead = `HTTP/1.1 ${num} OK
Date: Mon, 09 Apr 2018 08:09:11 GMT

`;
    return strHead;
  }

  _write(chunk, encoding, callback) {
    this.clientSocket.write(chunk);
    callback();
  }
}

module.exports = Response;
