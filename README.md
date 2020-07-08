---
home: true
heroText: 文档库
tagline: 文档库集合
---

### 关于搭建运行本文档库
> 前提

1. 本地[Node.js](https://nodejs.org/en/download/)版本 >= 8

```bash
# 查看本地node版本
node -v
```

2. 本地安装了[git](https://git-scm.com/downloads)

> 首次搭建

```bash
# 1. 全局安装vuepress
npm install vuepress -g

# 2. 下载本项目
git clone http://10.19.85.31:8888/cuc_bob/cuc-docs.git

# 3. 安装依赖
cd cuc-docs
npm install

# 4. 本地预览,根目录下运行
npm run dev

# 浏览器本地预览
http://localhost:9000

# 5. 提交文档到git
git push

# 浏览器查看发布后的效果(可能会需要几分钟等待时间后刷新页面查看效果)
http://10.1.236.205:10081/cuc-docs/
```
> 日常编写

```bash
# 每次编写文档前先从git上拉取最新版本，以免发生冲突
git pull

# 在根目录下运行预览
npm run dev

# 提交文档到git
git push
```

::: tip 注意点

修改`.vuepress/config.js`和`config.json`文件，及`新增/删除/重命名`文档时，需要执行命令: `npm run dev` 查看本地预览效果

:::

