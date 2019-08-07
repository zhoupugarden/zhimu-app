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
        id: null,
        name: "杨宇测试"
      }
    }
  },

  onLoad(options) {
    console.log("测试title");
    console.log(options);
    wx.setNavigationBarTitle({
      title: this.good.title
    });
    this.good.id = options.productId
  },

  mounted() {
    console.log(this.$root.$mp.query.productId)
  }

}
</script>

<style scoped>

</style>
