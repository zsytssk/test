## .babelrc

- Cannot find module '@babel/preset-runtime'
  - core-js/library/fn/promise.js

* presets
  - production、
  * development

- ts 配置升级

* env

* @ques 如何在开发的时候只使用 es6 生产的时候使用 es5

  - polyfill 如何加入...

* @ques @babel/plugin-syntax-dynamic-import"
  @babel/plugin-transform-classes

https://babeljs.io/docs/en/next/babelrc.html

## ts-loader

- @ques "baseUrl": "./src" tsconfig
- ts-node/register
- registerCompiler(interpret.extensions[file.ext]);

TS\*NODE_COMPILER_OPTIONS='{"module":"commonjs"}' \
mocha --compilers ts:ts-node/register,tsx:ts-node/register \
--compilerOptions \
--require ts-node/register test/\*\*/\_.spec.ts\*

require("ts-node").register({
compilerOptions: {
module: "commonjs",
},
});

module.exports = {
entry: './test.ts',
output: {
filename: "test.js"
},
module: {
loaders: [
{ test: /\.json$/, loader: 'json-loader' },
{
test: /\.ts$/,
loader: 'awesome-typescript-loader',
query: {
tsconfig: './tsconfig.json'
}
}
]
},
resolve: {
// Add '.ts' as resolvable extensions.
extensions: ['', '.webpack.js', '.web.js', '.js', '.ts']
}
}

rules: [
{
test: /\.ts$/,
loader: [
'awesome-typescript-loader?configFileName=tsconfig.test.json'
],
exclude: [
/\.(e2e)\.ts$/
]
}
]

{
test: /\.ts$/,
loader: 'awesome-typescript-loader',
options: {
configFileName: 'tsconfig.test.json'
},
exclude: [
/\.(e2e)\.ts$/
]
}

"dev": "cross-env NODE_ENV=development webpack",

## 2017-07-27 10:29:24

var definePlugin = new webpack.DefinePlugin({
**DEV**: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

## 2017-07-27 10:05:24

"babel-cli": "^6.3.17",
"babel-core": "^6.3.26",
"babel-eslint": "^7.1.1",
"babel-plugin-check-es2015-constants": "^6.3.13",
"babel-plugin-external-helpers": "^6.22.0",
"babel-plugin-istanbul": "^4.0.0",
"babel-plugin-syntax-jsx": "^6.3.13",
"babel-plugin-transform-decorators-legacy": "^1.2.0",
"babel-plugin-transform-es2015-arrow-functions": "^6.3.13",
"babel-plugin-transform-es2015-block-scoped-functions": "^6.3.13",
"babel-plugin-transform-es2015-block-scoping": "^6.3.13",
"babel-plugin-transform-es2015-classes": "^6.3.13",
"babel-plugin-transform-es2015-computed-properties": "^6.3.13",
"babel-plugin-transform-es2015-destructuring": "^6.3.13",
"babel-plugin-transform-es2015-for-of": "^6.3.13",
"babel-plugin-transform-es2015-function-name": "^6.3.13",
"babel-plugin-transform-es2015-literals": "^6.3.13",
"babel-plugin-transform-es2015-modules-commonjs": "^6.3.13",
"babel-plugin-transform-es2015-object-super": "^6.3.13",
"babel-plugin-transform-es2015-parameters": "^6.3.13",
"babel-plugin-transform-es2015-shorthand-properties": "^6.3.13",
"babel-plugin-transform-es2015-spread": "^6.3.13",
"babel-plugin-transform-es2015-sticky-regex": "^6.3.13",
"babel-plugin-transform-es2015-template-literals": "^6.3.13",
"babel-plugin-transform-es2015-unicode-regex": "^6.3.13",
"babel-plugin-transform-object-rest-spread": "^6.3.13",
"babel-plugin-transform-react-display-name": "^6.4.0",
"babel-plugin-transform-react-jsx": "^6.4.0",
"babel-register": "^6.3.13",

- babel-register @ques 这个是做什么的

* @ques 如果有多个 es6js 使用 require, 需要使用 babel 转化为 es5 这个如何处理
* 如何将所有的 js 合并成一个 js, 最终生产只有一个 js

* 在开发的时候使用 require, 生产合并成一个 js

## 问题

- define(["require", "exports"]... 这样实在是太恶心了
- 如何在最后将这些 js 全部合并成一个 js, 这还是一个问题

##

- 本地开发 import:> 测试 requre:> 生产合并成一个 js
- 如果我全部使用 ts 开发这个很好解决
