<template>
  <div v-if="movieData">
    <mt-header title="电影资源网" fixed>
      <router-link to="/" slot="left">
        <mt-button>返回</mt-button>
      </router-link>
    </mt-header>
    <div class="detail_container">
      <video v-if="movieData.trailer_urls" :src="movieData.trailer_urls[0]" controls></video>
      <div class="content">
        <div class="mov_img">
          <img v-if="movieData.images" :src="movieData.images.small" alt>
        </div>
        <div class="info">
          <span class="title">
            <strong v-text="movieData.title"></strong>
          </span>
          <span class="stars" v-if="movieData.pubdate">  {{movieData.rating.average>0 ? '豆瓣评分：'+movieData.rating.average :'暂无评分'}}</span>
          <span class="pubdate">上映日期：{{movieData.pubdate}}</span>
          <span class="actors">{{comDetail}}</span>
        </div>
      </div>
    </div>
    <div class="summary">
      <span class="sum_title">剧情简介</span>
      <span class="sum_con" v-text="movieData.summary"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      movieData: {}
    };
  },
  computed: {
    comDetail() {
      if (this.movieData.directors != undefined) {
        let detail = this.movieData;
        return `${detail.durations[0]} / ${detail.genres.join(" / ")} / ${
          detail.directors[0].name
        }(导演) / 
      ${detail.casts
        .map(item => {
          return item.name;
        })
        .join(" / ")}`;
      }else{
        return '';
      }
    }
  },
  name: "Detail",
  methods: {
    changeURl() {
      return new Promise((resolve, reject) => {
        let url = "";
        if (this.id != undefined) {
          url = `/dbapi/subject/${this.id}`;
          resolve(url);
        } else {
          alert("请返回首页");
          this.$router.push("/");
        }
      });
    },

    getDetail(url) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(url, {
            params: {
              apikey: "0b2bdeda43b5688921839c8ecb20399b"
            }
          })
          .then(res => {
            console.log(res.data);
            this.movieData = res.data;
          });
      });
    }
  },
  created() {
    this.changeURl().then(this.getDetail);
    // console.log(this.id);
  }
};
</script>

<style scoped>
.detail_container video {
  margin-top: 40px;
  width: 100%;
}
.content {
  display: flex;
  justify-content: space-around;
}
.mov_img {
  width: 32%;
}
.mov_img img {
  width: 100%;
}
.info {
  width: 64%;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.title {
  font-size: 25px;
  padding: 8px 0 8px 0;
}
.stars .actors {
  font-size: 15px;
  color: gray;
  padding-bottom: 5px;
}
.summary {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 10px;
}
.sum_title {
  font-size: 20px;
}
.sum_con {
  font-size: 15px;
  color: gray;
}
</style>


