import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './pages/HomeView.vue'
import ContactView from './pages/ContactView.vue'
import UserView from './pages/UserView.vue'

// Definizione delle rotte complete
const fullRoutes = {
  public: [ // Aggiungi le rotte publiche qui, visibili sia da autenticacto che da non autenticato.
    { path: '/', name: 'home', component: HomeView },
    { path: '/contact', name: 'contact', component: ContactView },
    // { path: '/esempio/:slug', name: 'esempio.show', component: EsempioShow, props: true },
  ],
  notAuth: [ // Aggiungi le rotte visibili solo se non sei autenticato qui, se necessario.
    { path: '/user', name: 'user', component: UserView },
  ],
  auth: [ // Aggiungi le rotte visibili solo se autenticato qui, se necessario.
    
  ],
};

// funzione interna che crea l'Object routes che contiene gli array con i
const routes = Object.keys(fullRoutes).reduce((acc, key) => {
  acc[key] = fullRoutes[key].map(route => route.name);
  return acc;
}, {});

const routerRoutes = [...fullRoutes.public, ...fullRoutes.notAuth, ...fullRoutes.auth];
const router = createRouter({ history: createWebHistory(), routes: routerRoutes })

export { router, routes };