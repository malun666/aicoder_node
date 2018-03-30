# 第一个 Nodejs 程序

首先创建 demos 文件夹。然后在此文件夹下创建`01_hello.js`文件

```shell
# 以下是linux/mac下使用终端用命令行创建文件，windows下请直接用资源管理可视化鼠标操作
$ mkdir demos && cd demos
$ touch 01_hello.js
```

然后用编辑器（推荐使用：vscode 或者 sublime）打开文件：`01_hello.js`，并添加代码如下：

```js
console.log('Hi, aicoder.com! Hello, world!');
```

保存文件，并用 node 执行此 js 文件。

打开系统的命令行工具（mac|linux 为终端，windows 下为 cmd 或 powershell），用 cd 命令进入 demos 文件夹。运行编译和执行 js 文件的命令：

```shell
# 进入demos目录
$ cd demos
$ node ./01_hello.js
Hi, aicoder.com! Hello, world!
```

至此，您的第一个 node 程序就已经运行成功了，也就是您的 nodejs 环境已经没有问题了。

---

[返回首页](../readme.md)
