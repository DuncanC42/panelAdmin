import { createRouter, createWebHistory } from 'vue-router'
import  PanelAdmin from '../views/PanelAdmin.vue'
import Connexion from '@/views/Connexion.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'connexion',
      component: Connexion,
    },
    {
      path: '/panel',
      name: 'panel',
      component:PanelAdmin,
    },
  ],
})

export default router
