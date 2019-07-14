import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/container/home'
import List from '@/components/container/list'
import Search from '@/components/container/search'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/list',
      name: 'List',
      component: List
    }, {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
