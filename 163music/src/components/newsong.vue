<template>
  <div>
    <div id="title">
      <span class="border">最新音乐</span>
    </div>
    <div class="song_item" v-for="item in newSongList"
      :key="item.id">
      <span class="song_title">{{item.name}}</span>
      <span class="song_detail">{{item.song.album.artists[0].name+' - '+item.name}}</span>
      <span class="icon_play">
        <img src="static/octicons/build/svg/play.svg" alt>
      </span>
    </div>
    <!-- <mt-cell
      v-for="item in newSongList"
      :key="item.id"
      :title="item.name"
      :label="item.song.album.artists[0].name+' - '+item.name"
      is-link
    ></mt-cell>-->
  </div>
</template>

<script>
export default {
  name: "Newsong",
  data() {
    return {
      newSongList: []
    };
  },
  methods: {
    getSong() {
      this.$axios.post("/api/api/personalized/newsong").then(res => {
        // console.log(res);
        this.newSongList = res.data.result;
      });
    }
  },
  created() {
    this.getSong();
  }
};
</script>
<style scoped>
/* .mint-cell-title {
  text-align: left;
} */
#title span {
  display: block;
  box-sizing: border-box;
  padding-top: 7px;
  text-align: left;
  height: 35px;
  font-size: 18px;
}
.border::before {
  content: " ";
  padding-right: 3px;
  width: 2px;
  height: 16px;
  background-color: #d33a31;
}
.song_item {
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.song_title {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 15px;
  padding: 3px 3px 3px 7px;
}
.song_detail {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 3px 3px 3px 7px;
  font-size: 10px;
  color: #999;
}
.icon_play {
  display: block;
  position: absolute;
  right: 0;
  padding-right: 15px;
  width: 25px;
  height: 25px;
}
.icon_play > img {
  width: 25px;
  padding-top: 7px;
  height: 25px;
  opacity:0.3;
}

/* .mint-cell-wrapper{
    border-bottom:1px solid #ddd;
}
.mint-cell-allow-right::after {
   content:'';
} */
</style>
