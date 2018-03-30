# node模块化

JS诞生的时候，仅仅是为了实现网页表单的本地校验和简单的dom操作处理。所以并没有模块化的规范设计。

项目小的时候，我们可以通过命名空间、局部作用域、自执行函数等手段实现变量不冲突。但是到了大一点的项目，各种组件，各种第三方插件和各种js脚步融合的时候，就会发现这些技巧远远不够。

## 模块化的演变

为什么要有JS模块化呢？在浏览器中，顶层作用域的变量是全局的，所以项目稍微复杂点，如果引用的js非常多的时候，很容易造成命名冲突，然后造成很大意想不到的结果。

为了避免全局污染，JS前辈们想了很多办法，也就是前端的模块化的演变过程，可以参考我的视频：[前端模块化演变](https://ke.qq.com/course/276435#tuin=1eb4a0a4)

**模块化演变过程：**

* 对象封装

  - 所有的方法和属性封装到一个对象中
  - 所有的访问通过对象来访问，只污染一个对象，尽量避免污染其他。

  ```js
  var module = {
  　star : 0,
　　f1 : function ()
　　　  //...
　　},
  　f2 : function (){
　　　　//...
　　}
　};
  module.f1();
  module.star = 1;

  ```

* 命名空间（对象封装的变种或者叫做升级）

  - 理论意义上减少了变量冲突
  - 缺点1：暴露了模块中所有的成员，内部状态可以被外部改写，不安全
  - 缺点2：命名空间会越来越长

  ```js
  var Shop = {}; // 顶层命名空间
  Shop.User = {}; // 电商的用户模块
  Shop.User.UserList = {}; //用户列表页面模块。
  Shop.User.UserList.length = 19; // 用户一共有19个。
  ```

* 私有空间

  - 私有空间的变量和函数不会影响全局作用域
  - 公开公有方法，隐藏私有属性

  ```js
  // => 给单个文件里面定义的局部变量都 变成 局部作用域里面的变量。
  // 第二个尝试：
  // a.js
  (function(){
    var a = 9;
  })();

  // b.js
  (function(){
    var a = "ssss";
  })();

  ```
  

* 模块的维护和扩展

  - 开闭原则
  - 可维护性好

  ```js
  // laoma.core.js
  (function(w, d1, d2){
    // 判断laoma框架是否存在，不存在初始化一下。
    if(!w.laoma) w.laoma = {};
    w.laoma.Btn = {
      getVal: function() {
        console.log('val');
      },
      setVal: function(str) {
        console.log('setvale');
      }
    };
  })(window || {}, depend1, depend2);

  // laoma.animate.js 
  // 动画组件
  (function(w, d1, d2){
    if(!w.laoma) {
      w.laoma = {};
    }
    w.laoma.animate = {};
  })(window || {}, depend1, depend2);

  // laoma.form.js 
  // 表单组件
  (function(w, d1, d2){
    if(!w.laoma) {
      w.laoma = {};
    }
    w.laoma.form = {};
  })(window || {}, depend1, depend2);
  ```

后续的演变就是，出现了AMD、CMD、CommonJS等模块化标准，然后前端模块化进入大爆发时代。

## 什么是JS模块化

JS模块化就是指JS代码分成不同的模块，模块内部定义变量作用域只属于模块内部，模块之间变量命名不会相互冲突。各个模块相互独立，而且又可以通过某种方式相互引用协作。

## 模块化的标准

目前前端流行的几个模块化标准：[CommonJs](http://wiki.commonjs.org/wiki/Modules/1.1)标准（node的方案）、[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)、[CMD](https://github.com/cmdjs/specification/blob/master/draft/module.md)、ES6模块方案。

未来的趋势肯定是ES6的标准方案会逐渐统一。但是AMD、CMD标准跟CommonJs的标准相差不大，需要我们都研究一下。

## requirejs入门

requirejs的使用：

第一步：[requirejs下载](http://requirejs.org/docs/download.html)

第二步： 把requirejs直接引入到html

`<script src="js/require.js"></script>`

第三步： 设置当前页面的js入口文件

`<script src="js/require.js" data-main="js/main"></script>`

data-main属性的作用是，指定网页程序的主模块。意思是当前整个网页的入口代码。那么其他需要引用的JS文件呢？

第四步： 引用其他模块的文件

主模块依赖于其他模块，这时就要使用AMD规范定义的的require()函数。

```js
// main.js
require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){
　// some code here
});
```

require()函数接受两个参数。第一个参数是一个数组，表示所依赖的模块，上例就是['moduleA', 'moduleB', 'moduleC']，即主模块依赖这三个模块；第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。

require()异步加载moduleA，moduleB和moduleC，浏览器不会失去响应；它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。

实际应用例子：

```js
　　require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone){

　　　　// some code here

　　});
```


如果依赖的JS文件跟我们的require.js不在相同的目录，那么需要我们单独设置一下路径映射关系。

```js
require.config({
  paths: {
    "underscore": "lib/underscore.min",
 　　"backbone": "lib/backbone.min"
  }
});
```


第五步：如何自定义AMD模块（可选）

自定义的模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性

```js
define(['myLib'], function(myLib){
  function foo(){
  　　myLib.doSomething();
  }
  return {
  　　foo : foo
  };
});
```

## CMD与seajs

[Sea.js]在推广过程中逐渐形成了CMD的模块定义标准。具体详情请[参考](https://www.cnblogs.com/jiangxiaobo/p/5587234.html)。

跟AMD比较类似，而且兼容CommonJS的模块写法。

CMD推崇的是：依赖就近依赖，AMD则默认约束模块一开始就声明相关依赖。其他定义方式及模块相关的变量都很相似。

## Node的模块化

待续.....



---

参考：

1. [NodeJs 官网文档](https://nodejs.org/)   
1. [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)
1. [Javascript模块化编程（二）：AMD规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
1. [Javascript模块化编程（三）：require.js的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
1. [CMD 模块定义规范](https://www.cnblogs.com/jiangxiaobo/p/5587234.html)

---

[老马免费视频教程](https://qtxh.ke.qq.com)   

[返回首页](../readme.md)