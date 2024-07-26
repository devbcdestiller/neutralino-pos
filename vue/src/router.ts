import { createMemoryHistory, createRouter } from 'vue-router'

import Dashboard from './pages/Dashboard.vue'
import Inventory from './pages/Inventory.vue'
import SalesProcessing from './pages/SalesProcessing.vue'
import Records from './pages/Records.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/inventory', component: Inventory },
  { path: '/sales', component: SalesProcessing},
  { path: '/records', component: Records}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router