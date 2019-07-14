<template>
  <div class="citylist">
    <mt-header title="电影资源网" fixed>
      <router-link to="/" slot="left">
        <mt-button>返回</mt-button>
      </router-link>
    </mt-header>
    <mt-index-list>
      <mt-index-section v-for="(cities,letter) in indexCity" :index="letter" :key="letter" v-show="cities.length > 0">
        <mt-cell v-for="city in cities" :key="city.id" :title="city.name" @click.native="selectCity(city.name.replace(/市$/, ''))"></mt-cell>
      
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
import CityList from "@/mock/citylist";

export default {
  data() {
    return {
      indexCity: {} //{A:[澳门],B:[北京],C:[长沙,成都],D:[东莞,大连..]}
    };
  },
  methods:{
    selectCity(city){
      this.$router.push({name:'Home',params:{currentCity:city}})
    }
  },
  created() {
    // console.log("citylist", this.$route.params);

    CityList.then(res => {
      // console.log(res)
      this.indexCity = res;
    });
  }
};
</script>
<style >
.mint-indexlist{
  height: 100%;
  margin-top: 40px;
}
.citylist{
  height: 100%
}
.mint-indexlist-content{
  height: 100%;
}
</style>

