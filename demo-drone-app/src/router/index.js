import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [
  { path: '/', component: 'LandingPage' },
  { path: '/login', component: 'Login'},
  { path: '/map', component: 'MapPage' },
  { path: '/newmission', component: 'NewMissionPage' },
  { path: '/settings', component: 'Settings'},
  { path: '/homepage', component: 'HomePage'},
  { path: '/drones', component: 'Drones'},
  { path: '/missions', component: 'MissionsPage'},
  { path: '/education', component: 'EducationPage'}
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
