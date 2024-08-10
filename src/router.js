import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import ContactView from './pages/ContactView.vue'
import UserView from './pages/UserView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView  },
    { path: '/user', name: 'user', component: UserView },
    { path: '/contact', name: 'contact', component: ContactView },
    // { path: '/esempio/:slug', name: 'esempio.show', component: EsempioShow, props: true },
  ],
})