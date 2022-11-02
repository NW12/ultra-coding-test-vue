import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import SignMessage from '../views/SignMessage'
import RecoverKey from '../views/RecoverKey'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/key-sign-generate',
    name: 'SignMessage',
    component: SignMessage,
  },
  {
    path: '/recover-public-key',
    name: 'RecoverKey',
    component: RecoverKey,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router