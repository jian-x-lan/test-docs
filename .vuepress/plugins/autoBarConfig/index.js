
// 根据文档结构生成顶部导航栏和侧边栏，设置黑白名单过滤文档，order设置同一文件夹下文档排序
module.exports = (options = {}, ctx) => ({
  name: 'autoBarConfig-plugin',
  async ready () {
    const { themeConfig, pages } = ctx
    const themeConfigData = require('./genSideBar.js')
    themeConfig.nav = [
      { text: '首页', link: '/' },
      ...themeConfigData(options, pages).navArr
    ]
    themeConfig.sidebar = themeConfigData(options, pages).sideBar
  }
})