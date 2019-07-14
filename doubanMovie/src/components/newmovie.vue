<template>
  <div class="container">
    <div class="content" v-for="item in NewMovieData" :key="item.id" @click="gotoPlay(item.id)">
      <div class="mov_img">
        <img v-if="item.images" :src="item.images.small" alt>
      </div>
      <div class="info">
        <span class="title">
          <strong v-text="item.title"></strong>
        </span>
        <span
          class="stars"
          v-if="item.rating"
        >{{item.rating.average>0 ? '豆瓣评分：'+item.rating.average :'暂无评分'}}</span>
        <!-- <span class="pubdate">上映日期：{{item.pubdate}}</span> -->
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
  </div>
</template>

<script>
export default {
  name: "NewMovie",
  data() {
    return {
      NewMovieData: []
    };
  },
  computed: {
    // comDetail() {
    //   if (this.NewMovieData.directors != undefined) {
    //     let detail = this.movieData;
    //     return `${detail.durations[0]} / ${detail.genres.join(" / ")} / ${
    //       detail.directors[0].name
    //     }(导演) /
    //   ${detail.casts
    //     .map(item => {
    //       return item.name;
    //     })
    //     .join(" / ")}`;
    //   } else {
    //     return "";
    //   }
    // }
  },
  methods: {
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
          .get("/dbapi/new_movies", {
            params: {
              apikey: "0b2bdeda43b5688921839c8ecb20399b"
            }
          })
          .then(res => {
            this.NewMovieData = res.data.subjects;
            console.log(this.NewMovieData);
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
  width: 75%;
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
</style>