<template>
  <div id='app'>
      <router-view/>
      <!-- <mt-tabbar v-model="currentTab" fixed>
        <mt-tab-item :id="tab.id" v-for="(tab,idx) in tabs" v-bind:key="idx">
          <img :src="tab.icon" slot="icon"/>
          {{tab.title}}
        </mt-tab-item>
      </mt-tabbar> -->
  </div>
</template>

<script>
import Vue from 'vue'
import Mint from 'mint-ui'

// 单独引入样式
import 'mint-ui/lib/style.css'
import './css/common.css'
// import '@/assets/iconfont/iconfont.css'
import Axios from 'axios'

Vue.prototype.$axios=Axios;

Vue.use(Mint)
// console.log(Axios)
// loading效果
// 利用axios拦截器全局设置
import { Indicator } from 'mint-ui';
Axios.interceptors.request.use(config => {
    Indicator.open();
    console.log('config:',config);

    return config
}, error => {
    Indicator.close();
    
    return Promise.reject(error)
})
// http响应拦截器
Axios.interceptors.response.use(data => {
    // 响应成功关闭loading
    Indicator.close();
    return data
}, error => {
    Indicator.close();
    return Promise.reject(error)
})



export default {
  data () {
    return {
      // currentTab: 'Home',
      // tabs: [
      //   {
      //     title: '首页',
      //     id: 'Home',
      //     icon: 'home'
      //   },
      //   {
      //     title: '正在热映',
      //     id: 'in_theaters',
      //     icon: 'device-camera-video'
      //   },
      //   {
      //     title: '即将上映',
      //     id: 'coming_soon',
      //     icon: 'clock'
      //   },
      //   {
      //     title: '新片榜',
      //     id: 'new_movies',
      //     icon: 'list-ordered'
      //   },
      //   {
      //     title: 'TOP250',
      //     id: 'top250',
      //     icon: 'star'
      //   }
      // ]
    }
  },
  created() {
    //  this.tabs.forEach(item=>{
    //    item.icon='static/octicons/build/svg/'+item.icon+'.svg';
    //  }) 
    },
  methods:{
    
  },
  name: 'App'
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

</style>
