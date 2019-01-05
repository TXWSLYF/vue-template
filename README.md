# 基于webpack的vue多页面开发环境搭建

## .babelrc文件配置
```
{
  "presets": [
    ["env", {
      "modules": false, // 启用将ES6模块语法转换为另一种模块类型，默认为common.js，设置为false就不会转换模块。
      "targets": { // 配置项目所支持浏览器所需的polyfill和transform。只编译所需的代码会使你的代码包更小。
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }]
  ],
  "plugins": ["transform-vue-jsx"]
}
```