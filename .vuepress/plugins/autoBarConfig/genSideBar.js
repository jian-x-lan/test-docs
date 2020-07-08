const fs = require('fs')
const path = require('path')
const ignore = require('ignore')

module.exports = (options, pages) => {
  const rootPath = options.rootPath || 'docs';
  const rootRelativePath = "../../../" + rootPath
  const mapRelation = options.mapRelation || {}
  const blackList = options.blackList && options.blackList.map(item => rootPath + '/' + item) || [];
  const whiteList = options.whiteList && options.whiteList.filter(item => fs.existsSync(path.resolve(__dirname, rootRelativePath + "/" + item))).map(item => rootPath + '/' + item) || [];
  const ig1 = ignore().add(blackList)
  const ig2 = ignore().add(whiteList)

  const getMenuPath = path => padMenuPath(path.split("/").slice(0, -1).join("/"));
  const getFilename = path => path.split("/").slice(-1).toString().replace(".md", "");
  const padMenuPath = path => `${path.startsWith("/") ? "" : "/"}${path}${path.endsWith("/") ? "" : "/"}`;
  const filterRootMarkdowns = page => page.menuPath !== "//" && page.filename !== 'README';

  const mapPages = pages.filter(page => page.relativePath).map(page => {
    let menuPath = getMenuPath(page.relativePath);
    return {
      frontmatter: page.frontmatter,
      menuPath: menuPath,
      filename: getFilename(page.relativePath)
    }
  }).filter(filterRootMarkdowns);
  let menus = [... new Set(mapPages.map(i => i.menuPath))]
  // 根节点
  reg = /(\/docs\/[^\/]*\/)/
  let reg2 = []
  menus.map(i => {
    reg.test(i)
    reg2.push(RegExp.$1)
  })

  let results = [...new Set(reg2)].map((path) => {
    let arr = path.split('/')
    let temp = path.substr(1)
    let flag1 = ig1.ignores(temp)
    let ig = ignore().add([temp])
    let arrTemp = whiteList.filter(item => ig.ignores(item))
    if (!flag1 || arrTemp.length > 0) {
      return { title: mapRelation[arr[arr.length - 2]] || arr[arr.length - 2], mPath: path, collapsable: false, children: [] }
    }
  })

  // 生成目录结构
  find = (s, e) => {
    let flag = false
    for (i = 0; i < s.length; i++) {
      let item = s[i]
      if (RegExp(item.mPath).test(e) && !RegExp(e).test(item.mPath)) {
        let arr = e.split('/')
        let result = find(item.children, e)
        let temp = e.substr(1)
        let flag1 = ig1.ignores(temp)
        let ig = ignore().add([temp])
        let arrTemp = whiteList.filter(white => ig.ignores(white))
        if (!result) {
          if (!flag1 || arrTemp.length > 0) {
            item.children ? item.children.push({ title: arr[arr.length - 2], mPath: e, collapsable: false, children: [] }) : item.children = [{ title: arr[arr.length - 2], mPath: e, collapsable: false, children: [] }]
          }
        }
        flag = true
        return flag
      }
    }
    return flag
  }
  menus.forEach(e => {
    find(results, e)
  })
  // 添补文件到对应子节点
  getTree = (data) => {
    data.map((item) => {
      let arr = item ? mapPages.filter(page => {
        let pat = page.menuPath.substr(1) + page.filename + '.md'
        return (page.menuPath == item.mPath) && (!ig1.ignores(pat) || ig2.ignores(pat))
      }) : []
      let brr = arr.map(obj => {
        return {
          title: obj.frontmatter.title || obj.filename,
          frontmatter: obj.frontmatter,
          path: obj.menuPath + obj.filename,
          mPath: obj.menuPath
        }
      }).sort((prev, next) => {
        let pOrder = prev.frontmatter.order || 1, nOrder = next.frontmatter.order || 1
        return pOrder - nOrder
      })
      if (item && item.children) {
        item.children.push(...brr)
        getTree(item.children)
      }
    })
  }
  getTree(results)
  let sideBar = {}
  results.map(result => {
    sideBar[result.mPath] = [result]
  })

  // 生成顶部导航栏
  function getFirstLink (data) {
    if (data) {
      if (data.children) {
        return getFirstLink(data.children[0])
      } else {
        return data.path
      }
    }
  }
  let navArr = []
  Object.keys(sideBar).map(key => {
    let temp = getFirstLink(sideBar[key][0])
    navArr.push({
      "text": sideBar[key][0].title,
      "link": temp
    })
  })

  return {
    navArr, sideBar
  }
}
