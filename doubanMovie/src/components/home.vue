<template>
  <div>
    <div class="home">
      <mt-header title="电影资源网" style="z-index:5">
        <router-link to="/citylist" slot="left">
          <mt-button>{{'['+nativeCity+']'}}</mt-button>
        </router-link>
        <mt-button icon="search" slot="right" @click.native="gotoSearch()"></mt-button>
      </mt-header>
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in top5" :key="item.id" @click.native="gotoPlay(item.id)">
          <img :src="item.images.medium">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <mt-navbar v-model="currentTab">
        <mt-tab-item :id="item.id" v-for="(item,idx) in tabs" :key="idx">{{item.title}}</mt-tab-item>
      </mt-navbar>
    </div>
    <div class="space"></div>
    <in-theaters v-if="currentTab=='intheaters'" :city="this.nativeCity"/>
    <coming v-if="currentTab=='coming'"/>
    <new-movie v-if="currentTab=='newmovie'"/>
    <top250 v-if="currentTab=='top250'"/>

    <!-- <theaters :city="nativeCity"/> -->

    <!-- <mt-tabbar v-model="currentTab" fixed>
      <mt-tab-item :id="tab.id" v-for="(tab,idx) in tabs" v-bind:key="idx">
        <img :src="tab.icon" slot="icon">
        {{tab.title}}
      </mt-tab-item>
    </mt-tabbar>-->
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import Location from "@/mock/location";
import InTheaters from "@/components/intheaters";
import Coming from "@/components/coming";
import NewMovie from "@/components/newmovie";
import Top250 from "@/components/top250";

import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  props: ["currentCity"],
  data() {
    return {
      nativeCity: this.currentCity,
      top5: [],
      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: ".swiper-pagination"
        }
      },
      currentTab: "intheaters",
      tabs: [
        // {
        //   title: "首页",
        //   id: "Home",
        //   icon: "home"
        // },
        {
          title: "正在热映",
          id: "intheaters",
          components: "InTheaters"
        },
        {
          title: "即将上映",
          id: "coming",
          components: "Comeing"
        },
        {
          title: "新片榜",
          id: "newmovie",
          components: "NewMovie"
        },
        {
          title: "TOP250",
          id: "top250",
          components: "Top250"
        }
      ]
    };
  },
  components: { InTheaters, Coming, NewMovie, Top250, swiper, swiperSlide },

  methods: {
    gotoSearch() {
      this.$router.push({
        name: "Search"
      });
    },
    gotoPlay(id) {
      this.$router.push({
        name: "Detail",
        params: {
          id: id
        }
      });
    },
    // 异步请求获取数据
    getMovieData() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get("/dbapi/in_theaters", {
            params: {
              city: this.nativeCity,
              apikey: "0b2bdeda43b5688921839c8ecb20399b"
            }
          })
          .then(res => {
            // 热映电影
            let data = res.data;
            console.log("data", data);

            // 获取热映top5
            this.top5 = data.subjects
              .sort((a, b) => b.collect_count - a.collect_count)
              .slice(0, 5);

            // Indicator.close();
          })
          .catch(() => {
            // Indicator.close();
            console.log("请求发生错误");
          });
      });
    },
    // 获取定位赋值给nativeCity
    getLocation(res) {
      return new Promise((resolve, reject) => {
        this.nativeCity = res;
        resolve();
      });
      // if (this.currentCity == undefined) {
      //   Location.then(res => {

      //     this.nativeCity = res;

      //   });
      // }
    }
  },
  name: "Home",
  created() {
    // this.tabs.forEach(item => {
    //   item.icon = "static/octicons/build/svg/" + item.icon + ".svg";
    // });
  },

  mounted() {
    if (this.currentCity == undefined) {
      Location.then(this.getLocation).then(this.getMovieData);
    } else {
      this.getMovieData();
    }
    // this.getMovie();
    // console.log(this.$route)
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.space{
  height: 284px;
}
/* .swiper-inner {
  width: 100%;
  height: 400px;
  padding-top: 50px;
  padding-bottom: 50px;
} */
.swiper-container {
  background-color: black;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 135px;
  height: 198px;
}
.swiper-slide img {
  width: 135px;
  height: 198px;
}

/* .mint-swipe img {
  width: 100%;
}
.carousel {
  height: 160px;
  margin-top: 40px;
} */
</style>
