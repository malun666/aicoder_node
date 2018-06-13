# Node 的包管理器

JavaScript 缺少包结构的定义，而[CommonJS](http://wiki.commonjs.org/wiki/CommonJS)定义了一系列的规范。而 NPM 的出现则是为了在 CommonJS 规范的基础上，实现解决包的安装卸载，依赖管理，版本管理等问题。

> CommonJS 是一个致力于构建统一的 JS 生态系统，它可以兼容 web 服务器、桌面应用、命令行应用、浏览器等。它定义了各种开发的规范和 API（不仅仅模块化相关的规范）
> 官网的说明： a group with a goal of building up the JavaScript ecosystem for web servers, desktop and command line apps and in the browser.

CommonJS 的模块主要如下：

- binary: Binary Data Objects (byte arrays and/or strings) (proposals, discussion, early implementations)
- encodings: Encodings and character sets (proposals, discussion, early implementations)
- io: I/O Streams (proposals, discussion)
- fs, fs-base: Filesystem (proposals, discussion, early implementations)
- system: System Interface (stdin, stdout, stderr, &c) (1.0, amendments proposed)
- assert, test: Unit Testing (1.0, amendment proposals pending)
- sockets: Socket I/O TCP/IP sockets (early proposals)
- event-queue: Reactor Reactor/Event Queue (early proposals)
- worker: Worker Worker (concurrent shared nothing process/thread) (proposal)
- console: console (proposal)

## 包结构

一个符合 CommonJS 规范的包应该是如下这种结构：

- 一个 package.json 文件应该存在于包顶级目录下
- 二进制文件应该包含在 bin 目录下。
- JavaScript 代码应该包含在 lib 目录下。
- 文档应该在 doc 目录下。
- 单元测试应该在 test 目录下。

### package.json 说明

package.json 文件就是当前项目或者包（js 模块、组件）的配置文件，所有当前项目的依赖的第三方模块，当前项目的配置等都定义在 package.json 文件中，当前它有一定的规范，我们可以通过 npm 命令初始化和创建 package.json 文件。

创建 package.json 文件步骤：

```shell
# 打开命令行，确保您已经安装好了node
mkdir demos
cd demos
# 初始化当前项目的package.json文件，-y表示默认参数。
npm init -y

######当前demos目录下就会增加一个package.json文件，内容如下：######
{
  "name": "demos",         // 项目名称
  "version": "1.0.0",      // 项目的版本号
  "description": "",       // 项目描述
  "main": "index.js",      // 引用目录模块的入口文件
  "scripts": {             // 可以通过npm运行的shell命令脚本
    "test": "echo \"Error: no test specified\" && exit 1"   // 可以通过npm run test 启动
  },
  "keywords": [],          // 项目的关键词
  "author": "",            // 作者，一般可以写上邮箱
  "license": "ISC"         // 当前项目或者包的开源协议
}
```

package.json 文件说明：

- name。包名，需要在 NPM 上是唯一的。不能带有空格。
- description。包简介。通常会显示在一些列表中。
- version。版本号。一个语义化的版本号（http://semver.org/ ），通常为 x.y.z。
  - x(Major): 主版本号：当你做了不兼容的 API 修改,一般一个比较完整大改版，需要修改 x（一般增加 1）
  - y(Minor): 次版本号：当你做了向下兼容的功能性新增
  - z(Patch): 修订号：当你做了向下兼容的问题修正。
  - 其他参考[中文翻译](https://www.cnblogs.com/hunchun/p/6373336.html)
- keywords。关键字数组。用于 NPM 中的分类搜索。

- maintainers。包维护者的数组。数组元素是一个包含 name、email、web 三个属性的 JSON 对象。
- contributors。包贡献者的数组。第一个就是包的作者本人。在开源社区，如果提交的 patch 被 merge 进 master 分支的话，就应当加上这个贡献 patch 的人。格式包含 name 和 email。如：

  ```js
  "contributors": [{
      "name": "Jackson Tian",
      "email": "mail @gmail.com"
    }, {
      "name": "fengmk2",
      "email": "mail2@gmail.com"
  }],
  ```

- bugs。一个可以提交 bug 的 URL 地址。可以是邮件地址（mailto:mailxx@domain），也可以是网页地址（http://url）。
- licenses。包所使用的许可证。
- repositories。托管源代码的地址数组。
- dependencies。当前包需要的依赖。这个属性十分重要，NPM 会通过这个属性，帮你自动加载依赖的包。

参考一个[express 框架](https://github.com/expressjs/express/blob/master/package.json)的的包配置文件：

```js
// 以下包，并不是完整的，我截取了部分内容。
{
  "name": "express",
  "description": "Fast, unopinionated, minimalist web framework",
  "version": "4.16.3",
  "author": "TJ Holowaychuk <tj@vision-media.ca>",
  "contributors": [
    "Aaron Heckmann <aaron.heckmann+github@gmail.com>",
    "Ciaran Jessup <ciaranj@gmail.com>",
  ],
  "license": "MIT",
  "repository": "expressjs/express",
  "homepage": "http://expressjs.com/",
  "keywords": [
    "express",
    "framework",
  ],
  "dependencies": {
    "accepts": "~1.3.5",
    "array-flatten": "1.1.1",
    "statuses": "~1.4.0",
    "type-is": "~1.6.16",
    "utils-merge": "1.0.1",
    "vary": "~1.1.2"
  },
  "devDependencies": {
    "after": "0.8.2",
    "cookie-parser": "~1.4.3",
    "cookie-session": "1.3.2",
    "ejs": "2.5.7",
    "connect-redis": "~2.4.1",
    "vhost": "~3.0.2"
  },
  "engines": {
    "node": ">= 0.10.0"
  },
  "files": [
    "LICENSE",
    "History.md",
    "Readme.md",
    "index.js",
    "lib/"
  ],
  "scripts": {
    "lint": "eslint .",
    "test": "mocha --require test/support/env --reporter spec --bail --check-leaks --no-exit test/ test/acceptance/",
  }
}
```

## npm 进行包管理

npm(node package manager)本来是 Node.js 的包管理工具，但随着 JS 这几年的蓬勃发展, npm 已经不再局限于 node 平台，尤其是 Webpack 的广泛应用，前端包管理基本由 npm 统一管理了。

npm 相关学习资源：

- npm[官网(https://www.npmjs.com/)
- npm[中文文档](https://www.npmjs.com.cn/)

### npm 安装本地包

安装第三方包到本地，只需要打开命令行，通过 cd 命令进入我们项目的根目录(确保您之前已经初始化了 package.json 文件)。
然后执行 npm 的 install 命令，如下：

语法：`npm install <package> --save-prod`

```shell
$ cd demos
$ npm install lodash --save-prod
# 输出如下：
npm notice created a lockfile as package-lock.json. You should commit this file.
+ lodash@4.17.5   # 有个+号，代表安装当前。
added 1 package in 1.091s  # 这里告诉我们天津一个包用了1.091秒
```

解释：

- `install`: 代表安装第三方包的意思，可以直接用 `i`代替。
- `--save-prod`: 代表把当前安装包的配置写入到当前 package.json 文件中, 可以用 `-P`代替。

我们项目文件夹会有两个变化：第一个就是增加了 package.json 文件和 node_modeules 文件夹

以下是 package.json 的增加的内容

```js
{
  "name": "demos",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
+ "dependencies": {             // 增加
+   "lodash": "^4.17.5"         // 增加lodash的安装包
+ }                             // 增加
}
```

node_modeules 文件夹存放我们刚刚安装包的文件。

命令简写的形式：

```shell
$ npm install lodash --save-prod  
$ npm i lodash -P  
##################################################
##  老版本中 --save 或者 -S，现在还支持,但建议用-P代替##
##################################################
$ npm i lodash -S
$ npm install lodash --save
```

### 安装开发阶段依赖的本地包

有时候我们需要一些第三方的包，仅仅在开发阶段依赖，则需要把 npm 的 install 命令添加`--save-dev`参数。

例如，我们开发阶段需要用 gulp 进行打包，则需要安装 gulp 包。

```shell
$ npm install gulp --save-dev
# 以下是简写形式， -D === --save-dev
$ npm i gulp -D
```

开发依赖，会在 package.json 文件的 devDependencies 下添加安装包的配置。如下所示：

```js
{
  "name": "demos",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lodash": "^4.17.5"
  },
+ "devDependencies": {
+   "gulp": "^3.9.1"
+ }
}
```

### 自动根据配置 package.json 文件下载安装依赖的包

package.json 文件可以帮我们进行包的管理和配置，如果在项目根目录下直接运行`npm install`,npm 会自动的根据 package.json 文件中的`dependencies`和`devDependencies`中配置的第三方包进行安装。这尤其是在团队开发和项目部署时非常有用。

只需要： `npm i`

package.json 文件中对模块的依赖可以使用`~、^、*`来控制。

- `~`: 安装兼容模块新发布的补丁版本，也就是说主版本号和次版本号不能变，最后一位修改号（补丁）可变化。例如：~1.1.0
- `^`: （默认）主版本号不能变，后面两个版本可变，兼容模块新发布的次版本、补丁版本：^1.1.0
- `*`: 兼容模块新发布的大版本、小版本、补丁版本：任何版本都可以。

### 设置国内镜像

npm 安装的包的时候，先检查本地是否有缓存，如果最近刚安装过，而且本地有缓存的话，直接用缓存。如果没有缓存会到 npm 的在线仓库下载并安装。默认的仓库地址：https://registry.npmjs.org/.

但是由于服务器在国外，而且国内你懂得，有时候下载比较大点的第三方包会非常慢，而且经常断掉。建议使用国内比较稳定快速的镜像，比如淘宝的 npm 镜像。

设置 npm 下载包的镜像为淘宝的镜像，设置方式：

打开终端(windows 下请使用 powershell)

```shell
# 设置淘宝镜像
$ npm config set registry https://registry.npm.taobao.org

# 验证是否配置成功
$ npm config get registry
# 输出如下则表示成功：
https://registry.npm.taobao.org/
```

另外一种办法：用 cnpm 替代 npm。

```shell
# 首先安装cnpm：
$ npm install -g cnpm --registry=https://registry.npm.taobao.org

# 使用
$ cnpm install expresstall express
```

### 控制安装的版本号

我们通过 npm 安装第三方包的时候，可以指定安装的具体版本，在包的后面添加一个@符号和具体版本号就可以了。

```shell
# 安装0.1.1版本的sax
$ npm install sax@0.1.1  
# 安装最新的sax
$ npm install sax@latest

# 还可以指定范围
$ npm install sax@">=0.1.0 <0.2.0"
```

### 安装全局依赖的包

有些包不仅仅需要我们本地开发运行时依赖，有时候也需要我们在命令行的任意位子启动和使用第三方包，那么就需要进行全局安装。
语法： `npm install -g <package>`
比如，gulp 我们有时候在任何一点地方都可能用到 gulp 命令工具，则需要全局安装 gulp。

```shell
$ npm install gulp --global
# 简写
$ npm i -g gulp

# 安装成功后，我们就可以随时随地都可以运行gulp命令了
$ gulp -v
```

### 更新安装包

更新本地的安装包：在 package.json 文件所在的目录中执行 `npm update` 命令。
更新全局的安装包：

```shell
$ npm update -g jshint
```

### 卸载安装包

卸载本地安装包

```shell
$ npm uninstall --save-prod lodash
# 简写
$ npm un -P lodash
```

卸载全局安装包

```shell
$ npm uninstall -g lodash
```

### 其他 npm 常用命令

更新升级 npm

```shell
$ npm i npm
```

罗列出当前安装的所有的包

```shell
$ npm list

# 控制列出所有包的目录层级 --depth 控制层级
$ npm list --depth=0

# 可以用ls 替代 list
$ npm ls --depth=1

# 罗列全局的安装的包
$ npm -g list --depth=0

# 以下是我的安装的包
/usr/local/lib
├── autoprefixer@7.2.3
├── babel-cli@6.18.0
├── bower@1.8.2
├── create-react-app@1.0.2
├── egg-init@1.9.0
├── eslint@3.12.2
├── generator-keystone@0.5.1
├── grunt-cli@1.2.0
├── gulp@3.9.1
├── json-server@0.12.1
├── live-server@1.2.0
├── n@2.1.5
├── nodemon@1.11.0
├── npm@5.6.0
├── npm-check@5.4.0
├── npm-check-updates@2.8.8
├── parcel-bundler@1.4.1
├── sails@0.12.13
├── static-server@2.0.5
├── typescript@2.2.1
├── vue-cli@2.9.3
├── vue-migration-helper@1.1.1
├── UNMET PEER DEPENDENCY webpack@>=1.3.0 <3
├── webpack-dev-server@1.16.2
└── yo@1.8.5
```

### npm 后续

- 发布 npm 包

npm 不仅仅可以帮助我们进行安装第三包，我们也可以自己发布一个包，供全世界的开发人员使用。
这块内容可以，查看官网的[npm publish](https://www.npmjs.com.cn/getting-started/publishing-npm-packages/)部分。

- npm scripts 使用

我们可以通过 npm 编写一些使用频率非常高的：打包、运行测试、运行部署等 shell 命令到 package.json 文件的 scripts 配置节点，方便我们执行一些复杂的重复性很高的任务。
具体学习：请移步[阮一峰老师的教程](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)。

以下只是简单介绍一下原理和使用：

npm 脚本的原理非常简单。每当执行 npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比如：

```js
// package.json文件
{
  // ...
  "scripts": {
    "dev": "gulp dev"    // 通过npm run dev 可以直接在shell中执行gulp dev命令。
  }
}
```

在 scripts 中定义的脚本，我们可以直接通过`npm run <keyname>`运行，跟在 shell 中运行一样。

常见的一般使用技巧：

```shell
// package.json文件
{
  // ...
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "unit": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run",
    "test": "npm run unit",
    "lint": "eslint --ext .js,.vue src test/unit",
    "build": "node build/build.js"
  }
}

# 以下是执行对应的任务

npm run build # 运行打包任务
npm run dist  # 运行生成dist目录文件的命令
npm run dev   # 运行开发调试
npm run test  # 运行测试

# 以下有几个内置的可以简写：

npm start # => npm run start
npm stop  # => npm run stop的简写
npm test  # => npm run test的简写
```

## yarn 是 npm 之外的另一种选择

yarn 是 Facebook 出的一款替代 npm 的包管理工具，npm 的功能它都有对应，而且使用方法也都很相似。那为什么 Facebook 再造一个重复的轮子呢？

在 yarn 之前的 npm 版本的问题：(当然部分问题已经修复)

- npm 安装包（packages）的速度不够快，是顺序下载，不是并行。
- 拉取的 packages 可能版本不同（最新的版本已经可以把版本锁住：package-lock.json）
- npm 允许在安装 packages 时执行代码，这就埋下了安全隐患

yarn 能兼容 npm 的配置文件 package.json，使用方式也非常接近 npm，所以我们可以基本上无缝从 npm 迁移到 yarn。而且 yarn 的确的确够快、够稳定、够优秀。yarn 的优点：

- 速度快：Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。并行下载安装包，速度真的是杠杠的。
- 比较安全：在执行代码之前，Yarn 会通过算法校验每个安装包的完整性。
- 可靠：使用详细、简洁的锁文件格式和明确的安装算法，Yarn 能够保证在不同系统上无差异的工作。
- 不管安装顺序如何，相同的依赖关系将在每台机器上以相同的方式安装。
- 将依赖包的不同版本归结为单个版本，以避免创建多个副本。
- 重试机制确保单个请求失败并不会导致整个安装失败。

### yarn 的安装

mac 下安装：

```shell
brew install yarn
```

windows 安装：直接[下载安装包](https://yarn.bootcss.com/docs/install.html#windows-tab)。

测试是否安装成功：

```shell
yarn --version
# 以下输出的是yarn的版本号，笔者的是如下，你的可能跟我不一样。
0.24.5
```

### npm 和 yarn 的 cli 差异

以下只是简单介绍一下 yarn 的使用方法：

初始化一个新的项目

```shell
yarn init
# 对应npm
npm init
```

添加一个依赖包

```shell
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
# 对应npm
npm install [package]
```

更新一个依赖包

```shell
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]

# 对应npm
npm update [package]
```

删除一个依赖包

```shell
yarn remove [package]
# 对应npm
npm uninstall [package]
```

安装所有的依赖包

```shell
yarn
or
yarn install

# 对应npm
npm install
```

全局安装依赖包

```shell
yarn global add [package]
npm i [package] -g

yarn global remove [package]
npm un [package] -g

yarn upgrade [package]
npm update [package]
```

注意：yarn 全局安装了一些命令包之后，可能全局范围内不能访问，这时候需要把 yarn 的全局的 bin 目录加入到操作系统的环境变量中。

```shell
# 查看yarn的全局bin目录
yarn global bin

# 输出（mac下）
/usr/local/Cellar/node/9.9.0/bin
```

## 总结

至此，我们已经基本掌握了 nodejs 的包管理、包加载机制等基本原理，后面就是我们怎么应用他们进行开发了。

---

参考：

[深入浅出 Node.js（三）：深入 Node.js 的模块机制](http://www.infoq.com/cn/articles/nodejs-module-mechanism?utm_source=articles_about_master-nodejs&utm_medium=link&utm_campaign=master-nodejs)

[Yarn 中文网](https://yarn.bootcss.com/)

[阮一峰老师的教程](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

---

[老马免费视频教程](https://qtxh.ke.qq.com)

[返回首页](https://malun666.github.io/aicoder_node/#/)
