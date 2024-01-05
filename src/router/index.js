import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue'
import Upload from '@/views/Upload.vue'
import Music from '@/views/Music.vue'
import List from '@/views/List.vue'
import MyPage from '@/views/MyPage.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import MenuList from '@/components/MenuList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main
    },
    {
        path: '/',
        component: Main,
        children: [
            {
                path: 'menu',
                name: 'menu',
                component: MenuList
            },
            {
                path: 'list',
                name: 'list',
                component: List
            },
            {
                path: '/list/:music',
                children: [
                  {
                    path: '',
                    name: 'music',
                    component: Music
                  },
                ]
            }
        ]
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
