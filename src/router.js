import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/boards',
      name: 'boards',
      component: () => import('./views/Boards.vue'),
      children: [
        {
          path: '/', component: () => import('./views/Dashboard.vue')
        },
        {
          path: ':name', component: () => import('./views/Board.vue'),  props: true
        }
      ]
    },
    {
      path: '/board/:id',
      name: 'board',
      component: () => import('./views/Board.vue'),
      children: [
        {
          path: ':name', component: () => import('./views/Board.vue')
        }
      ]
    }
  ]
})
