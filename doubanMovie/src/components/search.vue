<template>
  <div>
    <mt-header title="电影资源网" fixed>
      <router-link to="/" slot="left">
        <mt-button>返回</mt-button>
      </router-link>
    </mt-header>
    <mt-search v-model="value" cancel-text="取消" placeholder="搜索"></mt-search>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      value: ""
    };
  },
  methods: {
    getSearch() {
      this.$axios.get("/dbapi/search", {
        params: {
          q: this.value,
          apikey: "0b2bdeda43b5688921839c8ecb20399b"
        }
      });
    }
  }
};
</script>

<style>
.mint-searchbar{
    margin-top:40px;
}
</style>

