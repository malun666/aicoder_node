// 引入events模块
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  constructor(opt) {
    super(opt);
  }
}

const myEmitter = new MyEmitter();
let m = 0;
myEmitter.once('event', () => {
  console.log(++m);
});
myEmitter.emit('event');
// 打印: 1
myEmitter.emit('event');
// 忽略
