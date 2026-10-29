import { LeafThrough } from 'leafthrough'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-ignore React Bits registry component is JSX compiled by Vite.
import CircularGallery from './CircularGallery.jsx'
import { demoPages } from './pages'
import './style.css'

const mount = document.getElementById('reader-mount')!
const element = document.createElement('div')
element.className = 'magazine'
mount.append(element)

const indicator = document.getElementById('page-indicator')!
const galleryHost = document.createElement('div')
galleryHost.className = 'photo-gallery-overlay'
galleryHost.hidden = true
mount.append(galleryHost)
const galleryRoot = createRoot(galleryHost)
const photos = [
  { image: `${import.meta.env.BASE_URL}portfolio-images/photo-s-curve.jpg`, text: 'S形河岸', description: '河岸与水面的 S 形构图。', alt: '冬日河岸与水面' },
  { image: `${import.meta.env.BASE_URL}portfolio-images/photo-street-01.jpg`, text: '街头观察 01', description: '在城市现场观察人物与光线。', alt: '街头纪实摄影作品一' },
  { image: `${import.meta.env.BASE_URL}portfolio-images/photo-street-02.jpg`, text: '街头观察 02', description: '记录日常空间里的真实瞬间。', alt: '街头纪实摄影作品二' },
  { image: `${import.meta.env.BASE_URL}portfolio-images/photo-night.jpg`, text: '夜色', description: '用光影记录夜晚的城市。', alt: '夜景摄影作品' },
  { image: `${import.meta.env.BASE_URL}portfolio-images/photo-fast-shutter.jpg`, text: '高速快门', description: '高速快门凝固运动中的瞬间。', alt: '高速快门摄影作品' },
  { image: `${import.meta.env.BASE_URL}portfolio-images/photo-slow-shutter.jpg`, text: '慢速快门', description: '慢速快门留下流动的轨迹。', alt: '慢速快门摄影作品' },
]
let currentDetail: { page: number; visiblePages: number[]; layout: string } | undefined
let galleryVisible = false
let galleryFrame: number | undefined
let linksFrame: number | undefined

const contentLinksHost = document.createElement('nav')
contentLinksHost.className = 'new-media-links-overlay'
contentLinksHost.setAttribute('aria-label', '新媒体作品链接')
contentLinksHost.hidden = true
const contentLinks = [
  { title: '融合新闻案例 | 图文制作', meta: '公众号推文', href: 'https://mp.weixin.qq.com/s/Y_-QvbJ7clW0MarIkQ9SVw' },
  { title: '融合采编作品 | 摄像 排版', meta: '公众号推文', href: 'https://mp.weixin.qq.com/s/jxjIv-TreZyAPhQsRPaVIw' },
  { title: '融合采编作品 | 排版', meta: '公众号推文', href: 'https://mp.weixin.qq.com/s/AOJS9d_F03qfAe1QjeLh_Q' },
  { title: '小红书作品', meta: '自媒体作品', href: 'https://www.xiaohongshu.com/discovery/item/68104151000000002001dec5?source=webshare&xhsshare=pc_web&xsec_token=ABlOo4OwXRzad3QmER4NuUq7rSylE-Cc-W2NjU6M-lpY4=&xsec_source=pc_share' },
] as const
for (const item of contentLinks) {
  const link = document.createElement('a')
  link.className = 'work-link-row'
  link.href = item.href
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  link.setAttribute('aria-label', `${item.title}，${item.meta}，打开作品链接`)
  const title = document.createElement('span')
  title.className = 'work-link-title'
  title.textContent = item.title
  const meta = document.createElement('span')
  meta.className = 'work-link-meta'
  meta.textContent = item.meta
  const action = document.createElement('span')
  action.className = 'work-link-action'
  action.innerHTML = 'DETAILS <span aria-hidden="true">→</span>'
  link.append(title, meta, action)
  contentLinksHost.append(link)
}
mount.append(contentLinksHost)

function syncPhotoGallery() {
  if (!currentDetail) return
  if (!galleryVisible) {
    galleryHost.hidden = true
    galleryRoot.render(null)
    return
  }
  galleryHost.hidden = false
  const rect = mount.getBoundingClientRect()
  const pageWidth = Math.min(rect.height / 1.377, rect.width * (currentDetail.layout === 'single' ? 0.82 : 0.49))
  const pageHeight = pageWidth * 1.377
  const pageLeft = currentDetail.layout === 'single' ? (rect.width - pageWidth) / 2 : rect.width / 2 - pageWidth
  const pageTop = (rect.height - pageHeight) / 2
  galleryHost.style.left = `${pageLeft + pageWidth * 0.07}px`
  galleryHost.style.top = `${pageTop + pageHeight * 0.28}px`
  galleryHost.style.width = `${pageWidth * 0.86}px`
  galleryHost.style.height = `${pageHeight * 0.51}px`
  galleryRoot.render(createElement(CircularGallery, {
    items: photos,
    bend: 3,
    textColor: '#ffffff',
    borderRadius: 0.05,
    scrollEase: 0.05,
    onItemClick: (item: { text?: string }, index: number) => console.log(item.text, index),
    showTitles: false,
    intro: false,
  }))
}

function syncContentLinks() {
  if (!currentDetail || !currentDetail.visiblePages.includes(6) || magazine.turning) {
    contentLinksHost.hidden = true
    return
  }
  const rect = mount.getBoundingClientRect()
  const pageWidth = Math.min(rect.height / 1.377, rect.width * (currentDetail.layout === 'single' ? 0.82 : 0.49))
  const pageHeight = pageWidth * 1.377
  const pageLeft = currentDetail.layout === 'single'
    ? (rect.width - pageWidth) / 2
    : currentDetail.visiblePages.indexOf(6) === 1 ? rect.width / 2 : rect.width / 2 - pageWidth
  const pageTop = (rect.height - pageHeight) / 2
  contentLinksHost.style.left = `${pageLeft + pageWidth * 0.05}px`
  contentLinksHost.style.top = `${pageTop + pageHeight * 0.315}px`
  contentLinksHost.style.width = `${pageWidth * 0.9}px`
  contentLinksHost.style.height = `${pageHeight * 0.485}px`
  contentLinksHost.hidden = false
}

function watchContentLinks() {
  linksFrame = undefined
  if (currentDetail?.visiblePages.includes(6) && magazine.turning) {
    contentLinksHost.hidden = true
    linksFrame = requestAnimationFrame(watchContentLinks)
    return
  }
  syncContentLinks()
}

function isPhotoPage() {
  return currentDetail?.page === 3 && currentDetail.visiblePages.includes(3)
}

function hidePhotoGallery() {
  if (galleryFrame !== undefined) {
    cancelAnimationFrame(galleryFrame)
    galleryFrame = undefined
  }
  galleryVisible = false
  galleryHost.hidden = true
  galleryRoot.render(null)
}

function setPhotoGalleryVisible(visible: boolean) {
  if (galleryVisible === visible) return
  galleryVisible = visible
  if (visible) {
    syncPhotoGallery()
  } else {
    galleryHost.hidden = true
    galleryRoot.render(null)
  }
}

function watchPhotoPageTurn() {
  galleryFrame = undefined
  if (!isPhotoPage()) return

  // Page changes are emitted when a turn is committed, while the sheet is still moving.
  // Keep the gallery hidden for the whole flight and reveal it only after the engine settles.
  if (magazine.turning) {
    setPhotoGalleryVisible(false)
    galleryFrame = requestAnimationFrame(watchPhotoPageTurn)
    return
  }
  setPhotoGalleryVisible(true)
}

const magazine = new LeafThrough(element, {
  pages: demoPages,
  label: '季玉静个人作品集',
  interaction: { keyboard: 'global' },
  onPageChange: (detail) => {
    currentDetail = detail
    const { page, pageCount } = detail
    indicator.textContent = `${String(page + 1).padStart(2, '0')} / ${String(pageCount).padStart(2, '0')}`
    if (!isPhotoPage()) {
      hidePhotoGallery()
    } else {
      setPhotoGalleryVisible(false)
      if (galleryFrame !== undefined) {
        cancelAnimationFrame(galleryFrame)
        galleryFrame = undefined
      }
      if (magazine.turning) {
        galleryFrame = requestAnimationFrame(watchPhotoPageTurn)
      } else {
        setPhotoGalleryVisible(true)
      }
    }
    contentLinksHost.hidden = true
    if (linksFrame !== undefined) cancelAnimationFrame(linksFrame)
    linksFrame = requestAnimationFrame(watchContentLinks)
  },
})

// A reader can begin dragging a page before its page-change event fires. Hide immediately,
// then watch only for the duration of that gesture/turn so the gallery never rides the sheet.
element.addEventListener('pointerdown', () => {
  if (currentDetail?.visiblePages.includes(6)) {
    contentLinksHost.hidden = true
    if (linksFrame === undefined) linksFrame = requestAnimationFrame(watchContentLinks)
  }
  if (!isPhotoPage()) return
  setPhotoGalleryVisible(false)
  if (galleryFrame === undefined) galleryFrame = requestAnimationFrame(watchPhotoPageTurn)
})

window.addEventListener('resize', () => {
  syncPhotoGallery()
  syncContentLinks()
})
document.getElementById('previous')!.addEventListener('click', () => magazine.prev())
document.getElementById('next')!.addEventListener('click', () => magazine.next())
document.querySelector<HTMLAnchorElement>('.brand')!.addEventListener('click', (event) => {
  event.preventDefault()
  magazine.goTo(1, { animate: true })
})
document.querySelector<HTMLAnchorElement>('.contact-link')!.addEventListener('click', (event) => {
  event.preventDefault()
  magazine.goTo(7, { animate: true })
})
