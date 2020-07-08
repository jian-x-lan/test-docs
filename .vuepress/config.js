const configData = require('../config.json')
module.exports = {
  title: 'CUC-DOCS',
  description: 'cuc部门内部文档库',
  base: "/cuc-docs/",
  port: 9000,
  markdown: {
  },
  plugins: [
    //自定义搜索插件
    require('./plugins/search/index.js'),
    //自定义生成顶部导航栏和侧边栏
    [require('./plugins/autoBarConfig/index.js'), configData],
    '@vuepress/back-to-top',
    'vuepress-plugin-mermaidjs'
  ],
  themeConfig: {
    repo: 'http://10.19.85.31:8888/cuc_bob/cuc-docs.git',
    repoLabel: '查看源码',
    displayAllHeaders: true,
    sidebarDepth: 2
  }
}