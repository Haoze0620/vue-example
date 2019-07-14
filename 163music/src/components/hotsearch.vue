<template>
  <div>
    <mt-search v-model="value" cancel-text="取消" placeholder="搜索">
      <!-- <mt-cell v-for="item in result" :title="item.title" :value="item.value"></mt-cell> -->
    </mt-search>
  </div>
</template>

<script>
export default {
  name: "Hotsearch",
  data(){
      return{
          value:'lin',
          hotsearch:[]
      }
  },
  methods:{
      getHotSearch(){
          this.$axios.post('api/weapi/search/hot').then(res=>{
              console.log(res.data)
          })
      }
  },
  created(){
      this.getHotSearch();
  }
};
</script>

