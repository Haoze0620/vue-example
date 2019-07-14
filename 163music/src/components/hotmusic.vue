<template>
  <div>
    <div class="container">
      <div class="cover_img">
        <div class="cover"></div>
        <div class="pos">
          <div class="logo"></div>
          <div class="update">每周四更新</div>
        </div>
      </div>
      <div class="song">
        <div class="song_item" v-for="(item,idx) in top20" :key="idx">
          <span class="index">{{idx < 9 ? "0" + (idx + 1) : idx + 1}}</span>
          <span class="song_title" v-text="item.name"></span>
          <span class="song_detail" v-text="(item.artists[0].name+' - '+item.album.name)"></span>
          <span class="icon_play">
            <img src="static/octicons/build/svg/play.svg" alt>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hotmusic",
  data() {
    return {
      hotMusic: [],
      top20: []
    };
  },
  computed: {
    // 获取前20的歌曲信息
    // top20() {
    //   let top = [];
    //   for (var i = 0; i < 20; i++) {
    //     top.push(this.hotMusic[i]);
    //   }
    //   return top;
    // }
  },
  methods: {
    getSong() {
      this.$axios.post("/api/api/playlist/detail?id=3778678").then(res => {
        // console.log(res);
        this.hotMusic = res.data.result.tracks;
        // console.log(this.hotMusic);
        for (var i = 0; i < 20; i++) {
          this.top20.push(this.hotMusic[i]);
        }
      });
    }
    // showData(){
    //   top20.map(item=>{
    //      console.log(item.name)
    //       console.log(item.artists[0].name+' - '+item.album.name)
    //   })

    //}
  },
  created() {
    this.getSong();
    // this.showData();
  }
  // beforeMount() {

  // }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: flex-start; */
}
.cover_img {
  width: 100%;
  /* height: 60px; */
  overflow: hidden;
  padding-top: 38.9%;
  z-index: 0;
  background: url("../assets/hot_music_bg.jpg") no-repeat;
  background-size: contain;
  position: relative;
  /* background-color: rgba(0, 0, 0, 0.2); */
}

.cover {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.2);
}
.pos {
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  z-index: 2;
  padding-left: 20px;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.logo {
  background: url("../assets/index_icon_2x.png") no-repeat;
  background-size: 166px 97px;
  width: 142px;
  height: 67px;
  background-position: -24px -30px;
}
.update {
  margin-top: 10px;
  color: hsla(0, 0%, 100%, 0.8);
  font-size: 12px;
  transform: scale(0.91);
  transform-origin: left top;
  text-align: left;
}
.song {
  width: 100%;
}

.song_item {
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.index {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 25px;
  padding: 5px 3px 3px 5px;
}
.song_title {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 15px;
  padding: 3px 3px 3px 40px;
}
.song_detail {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 3px 3px 3px 40px;
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
  opacity: 0.3;
}
</style>
