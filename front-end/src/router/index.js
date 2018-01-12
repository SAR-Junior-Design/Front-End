import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import MapPage from '../components/MapPage.vue'
import NewMissionPage from '../components/NewMissionPage.vue'
import CurrentMissionPage from '../components/MissionPage.vue'
import HomePage from '../components/HomePage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/test-page',
      name: 'MapPage',
      component: MapPage
    },
    {
      path: '/new-mission-page',
      name: 'NewMissionPage',
      component: NewMissionPage
    },
    {
      path: '/current-mission-page',
      name: 'CurrentMissionPage',
      component: CurrentMissionPage
    },
    {
      path: '/home-page',
      name: 'HomePage',
      component: HomePage
    }
  ]
})
