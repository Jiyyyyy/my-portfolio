import type { PageDescriptor } from 'leafthrough'

const page = (file: string, alt: string, text: string): PageDescriptor => ({
  src: `${import.meta.env.BASE_URL}portfolio-pages/${file}`,
  alt,
  text,
})

export const demoPages: PageDescriptor[] = [
  page('page-01-cover.svg?v=6', '季玉静个人作品集封面：浅色纹理纸张与压纹字样。', 'Jiy。季玉静个人作品集。'),
  page('page-02-about.svg?v=3', 'About Me 页面：保留个人问候标题与页眉，留白呈现。', '你好，我是季玉静。'),
  page('page-03-contents.svg?v=2', '作品集目录：摄影、视觉设计、新闻作品、新媒体作品。', '作品目录：摄影、视觉设计、新闻作品、新媒体作品。'),
  page('page-04-photo.svg?v=3', '摄影互动页：拖动或滚动 Circular Gallery 浏览 6 张摄影作品，点击作品查看大图。', '摄影作品互动画廊。包含河岸构图、街头纪实、夜景、高速快门与慢速快门摄影。拖动或滚动浏览，点击照片查看大图。'),
  page('page-07-design.svg?v=10', '节日主题海报与校园招新海报并列展示。', '视觉设计作品：节日主题海报与校园招新海报。'),
  page('page-09-news.svg?v=8', '第6页集中呈现三则新华社报道作品。', '新闻报道作品集中展示于第6页。'),
  page('page-11-content.svg?v=10', '公众号推文与短视频作品直达链接。', '公众号推文与短视频作品链接。'),
  page('page-12-contact.svg?v=15', '浅色压纹联系页：邮箱置于左侧留白处，避开压纹曲线。', '邮箱：jiy_2023@163.com。'),
]
