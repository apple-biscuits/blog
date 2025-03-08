import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '提效工具', link: '/nav/' },
  {
    text: '我的小册',
    // link: '/booklet/',
    items: [
      {
        text: 'Vue3 全家桶',
        link: '/booklet/vue3/',
      },
      {
        text: 'Vitepress',
        link: '/booklet/vitepress/',
      },
      {
        text: 'python',
        link: '/booklet/python/',
      },
    ],
  },
  {
    text: '生活记录',
    link: '',
  },
  { text: '个人项目', link: '' },
  {
    text: '关于我',
    link: '/about',
  },
  {
    text: 'todo',
    link: '/todo',
  },
]
