import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [
  { path: '/', component: 'Login' },
  { path: '/map', component: 'MapPage' },
  { path: '/mission', component: 'MissionPage' },
  { path: '/newmission', component: 'NewMissionPage' },
  { path: '/settings', component: 'Settings'}
]

const routes = routerOptions.map(route => {
  return {
    path: route.path,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes
})