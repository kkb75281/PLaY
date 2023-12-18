import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue'
import Upload from '@/views/upload.vue'
import List from '@/views/List.vue'
import MyPage from '@/views/MyPage.vue'
import Login from '@/views/login.vue'
import Signup from '@/views/signup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/Welcome.vue')
    },
    {
        path: '/checkemail',
        name: 'checkemail',
        component: () => import('@/views/CheckEmail.vue')
    },
    {
      // path: '/about',
      // name: 'about',
      // // route level code-splitting
      // // this generates a separate chunk (About.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
