<template>
  <div class="container">
    <goods :goodInfo="good"></goods>
  </div>

</template>

<script>

  import goods from '@/components/goods';


export default {

  components: {
    goods
  },

  data() {
    return {
      good : {
        title: "测试title",
        name:"yangyu测试"
      }
    }

  },

  onLoad() {
    console.log("测试title");
    wx.setNavigationBarTitle({
      title: this.good.title
    });
  }

}
</script>

<style scoped>

</style>
