<template>
  <div id="app">
    <!-- <mt-header title="网易云音乐" style="background:red" fixed>
    </mt-header>
    <mt-header/>-->
    <header>
      <span>网易云音乐</span>
      <mt-navbar v-model="selected" style="height:35px">
        <mt-tab-item
          v-for="(item,idx) in tabs"
          v-bind:key="idx"
          :id="item.id"
          v-text="item.name"
          style="padding:9px;font-size:15px"
        :onclick="goto()"></mt-tab-item>
      </mt-navbar>
    </header>
    <div style="height:80px"></div>


    <router-view/>
  </div>
</template>

<script>
import Home from "@/components/container/home";

import Vue from "vue";
import Axios from "axios";
Vue.prototype.$axios = Axios;
// loading效果
// 利用axios拦截器全局设置
import { Indicator } from "mint-ui";
Axios.interceptors.request.use(
  config => {
    Indicator.open();
    // console.log('config:',config);
    return config;
  },
  error => {
    Indicator.close();

    return Promise.reject(error);
  }
);
// http响应拦截器
Axios.interceptors.response.use(
  data => {
    // 响应成功关闭loading
    Indicator.close();
    return data;
  },
  error => {
    Indicator.close();
    return Promise.reject(error);
  }
);

export default {
  data() {
    return {
      selected: "home",
      tabs: [
        {
          name: "推荐歌曲",
          id: "home",
          path:'/home'
        },
        {
          name: "热歌榜",
          id: "list",
          path:'/list'
        },
        {
          name: "搜索",
          id: "search",
          path:'/search'
        }
      ]
    };
  },
  components: {
    Home
  },
  methods:{
    goto(){
      this.$router.push('/'+this.selected)
    }
  },
  name: "App"
};
</script>

<style >
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  padding: 0;
  margin: 0;
  position: relative;
}
header {
  position: fixed;
  z-index: 10;
  width: 100%;
  top: 0;
  left: 0;
  box-shadow: 0px 1px 1px #eee;
}
header > span {
  display: block;
  line-height: 45px;
  background-color: red;
  height: 45px;
  color: white;
}

.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 3px solid red;
  color: red;
  margin-bottom: -3px;
}
.mint-navbar .mint-tab-item {
  padding: 5px;
  font-size: 14px;
}
</style>
