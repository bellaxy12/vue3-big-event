import { createRouter, createWebHistory } from 'vue-router'

// history模式:creteWebHistory
// hash模式:createWebHashHistory
// vite 的配置 import.meta.env.BASE_URL 是路由的基准地址，默认是 ’/‘
// https://vitejs.dev/guide/build.html#public-base-path
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
