# 季玉静｜翻页式个人作品集

保留 LeafThrough 的 3D 翻页体验，展示河南大学新闻学专业季玉静的摄影、视觉设计、新闻报道与新媒体作品。

## 页面内容

- 摄影：S 形构图、街头纪实、高速与慢速快门作品。
- 视觉设计：节日海报、招新海报、CDR 海报和音乐专辑封面。
- 新闻报道：新华社报道截图及标题。
- 新媒体：公众号推文和小红书作品链接。

页面支持拖动翻页、点击箭头和键盘左右方向键。顶部“作品链接”菜单可打开公众号和小红书作品，邮箱链接可直接联系。

## 更新作品

- `demo/pages.ts` 管理页面顺序、图片替代文本和屏幕阅读器说明。
- `demo/public/portfolio-pages/` 存放 12 张杂志页面的 SVG 排版稿。
- `demo/public/portfolio-images/` 存放优化后的摄影、海报和报道截图。
- `demo/index.html` 管理浏览器标题、个人信息、邮箱与外部作品链接。

## 本地预览

安装 Node.js 后，在项目目录运行：

```bash
npm install
npm run dev
```

## 发布

仓库已有 GitHub Actions：向 `main` 分支提交后，会自动构建并发布 GitHub Pages。部署进度可在 GitHub 的 **Actions** 页面查看，网站地址可在 **Settings → Pages** 查看。

## 项目来源

翻页引擎来自 [LeafThrough](https://github.com/dmtrbrl/leafthrough)，保留其 MIT 许可证。
