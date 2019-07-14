import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import CityList from '@/components/citylist'
import Detail from '@/components/detail'
import Search from '@/components/search'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/home',
      name: 'Home',
      component: Home,
      props: true,
      
    },
    {
      path: '/citylist',
      name: 'CityList',
      component: CityList
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      props: true
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }, {
      path: '/',
      redirect: {
        name: 'Home'
      }
    }

  ]
})
