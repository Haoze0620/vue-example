<template>
  <div id="main">
    <div id="title">
      <span class="border">推荐歌单</span>
    </div>

    <main id="m_main">
      <div class="m_content">
        <figure v-for="(item,idx) in songList" :key="idx">
          <img :src="item.picUrl" alt>
          <figcaption>{{item.name}}</figcaption>
          <span class="num">{{(item.playCount/1)}}</span>
        </figure>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songList: []
    };
  },
  methods: {
    getList() {
      this.$axios
        .post("/api/api/personalized/playlist")
        .then(res => {
          // console.log(res);
          this.songList = res.data.result;
          // console.log(this.songList);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getList();
  },
  name: "Recommendation"
};
</script>

<style scoped>
#main {
  margin-top: 3px;
}
#title {
  display: block;

  height: 25px;
}
#title span {
  display: block;
  box-sizing: border-box;
  padding-top: 7px;
  text-align: left;
  height: 35px;
  font-size: 18px;
}
.m_content {
  display: flex;
  flex: 1;
  overflow-x: hidden;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.m_content figure {
  position: relative;
  width: 32%;

  margin-top: 4px;
}
.m_content figure img {
  width: 100%;
}

.m_content figure figcaption {
  font-size: 14px;
  text-align: center;
}
.border::before {
  content: " ";
  padding-right: 3px;
  width: 2px;
  height: 16px;
  background-color: #d33a31;
}
.num {
  position: absolute;
  right: 5px;
  top: 2px;
  z-index: 3;
  padding-left: 13px;
  color: #fff;
  font-size: 12px;
  background-position: 0;
  background-repeat: no-repeat;
  background-size: 11px 10px;
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
}
</style>
