'use strict';

const Application = require('./application');

/**
 * 使用demo
 */

var app = new Application();
app.on('init', () => {
  console.log('初始化！');
});
app.on('preInit', () => {
  console.log('pre init');
});
app.start();
