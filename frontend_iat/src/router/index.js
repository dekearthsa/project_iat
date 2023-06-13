import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import IATBoard from '../views/IATBoard.vue'
import ConfigIAT from '../views/ConfigIAT.vue'
import SignUser from '../views/SignUser.vue'
import AdminPanel from '../views/AdminPanel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/iatboard',
      name: 'IATBoard',
      component: IATBoard
    },
    {
      path: '/configiat',
      name: 'ConfigIAT',
      component: ConfigIAT
    },
    {
      path: '/sign',
      name: 'SignUser',
      component: SignUser
    },
    {
      path: '/adminpanel',
      name: 'AdminPanel',
      component: AdminPanel
    }
  ]
})

export default router
