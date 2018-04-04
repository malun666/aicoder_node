const path = require('path');
let linuxPath = '/Users/aicoder/abc.html';
let name = path.basename(linuxPath);
console.log(name);

let winPath = 'c:\\temp\\abc.html';
let winName = path.basename(linuxPath);
console.log(winName);

console.log(path.basename(linuxPath, '.html'));
