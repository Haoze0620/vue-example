<template>
  <div class="container">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div class="content" v-for="(item,idx) in topData" :key="item.id" @click="gotoPlay(item.id)">
        <div class="mov_img">
          <img v-if="item.images" :src="item.images.small" alt>
        </div>
        <div class="info">
          <span class="title">
            <strong>{{'NO.'+(idx+1)+' '+item.title}}</strong>
          </span>
          <span
            class="stars"
            v-if="item.rating"
          >{{item.rating.average>0 ? '豆瓣评分：'+item.rating.average :'暂无评分'}}</span>
          <span class="actors">
            {{`${item.durations[0]} / ${item.genres.join(" / ")} / ${
            item.directors[0].name
            }(导演) /
            ${item.casts
            .map(act => {
            return act.name;
            })
            .join(" / ")}`}}
          </span>
        </div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
export default {
  name: "Top250",
  data() {
    return {
      topData: [],
      allLoaded:false,
      count: 10,
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
          .get("/dbapi/top250", {
            params: {
              count: this.count,
              start: this.start,
              apikey: "0b2bdeda43b5688921839c8ecb20399b"
            }
          })
          .then(res => {
            this.total = res.data.total;
            this.topData.push(...res.data.subjects);
            console.log(res.data);
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
.content {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid black;
}

.mov_img {
  width: 23%;
}
.mov_img img {
  width: 100%;
}
.info {
  width: 73%;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.title {
  font-size: 17px;
  padding: 3px 0 3px 0;
}
.stars .actors {
  font-size: 10px;
  color: gray;
  padding-bottom: 2px;
}
.mint-loadmore {
  overflow-y: auto;
}
</style>