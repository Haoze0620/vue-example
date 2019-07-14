<template>
  <div class="mov_container">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
    <div class="mov_item" v-for="item in comingData" :key="item.id" @click="gotoPlay(item.id)">
      <img :src="item.images.small" alt>
      <span class="mov_name">
        <strong v-text="item.title"></strong>
      </span>
      <!-- <span class="mov_stars" >{{item.rating.average>0 ? '豆瓣评分：'+item.rating.average :'暂无评分'}}</span> -->
    </div>
    </mt-loadmore>
  </div>
</template>

<script>
export default {
  name: "Coming",
  data() {
    return {
      comingData: [],
      allLoaded:false,
      count: 9,
      page: 0,
      start: 0,
      total:0
    };
  },
  methods: {
    loadBottom() {
      this.page++;
      this.start = this.page * this.count;
      if(this.start>this.total-1){
          this.allLoaded=true;
          return;
      }
      this.getMovie();
      console.log(666);
    },
    gotoPlay(id) {
      this.$router.push({
        name: "Detail",
        params: {
          id: id
        }
      });
    },
    getMovie() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get("/dbapi/coming_soon", {
            params: {
              count: this.count,
              start: this.start,
              apikey: "0b2bdeda43b5688921839c8ecb20399b"
            }
          })
          .then(res => {
            this.total = res.data.total;
            this.comingData.push(...res.data.subjects) ;
            console.log('coming_soon',res.data)
          });
      });
    }
  },
  created() {
    this.getMovie();
  }
};
</script>
<style>
/* .mov_container {

  display: flex;
  flex-wrap: wrap;
  flex: 1;
  overflow: hidden;
  justify-content: flex-start;
} */
.mov_item {
  width: 31%;
  margin: 0 3px 0 3px;

  margin-top: 5px;
  align-items: flex-end;
  flex-shrink: 0;
}
.mov_item img {
  width: 100%;
  /* height: auto; */
  align-items: flex-end;
  flex-shrink: 0;
}
.mov_name {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
}
.mint-loadmore-content {

  display: flex;
  flex-wrap: wrap;
  flex: 1;
  overflow: hidden;
  justify-content: flex-start;
}
.mint-loadmore{
  overflow-y: auto;
}
</style>