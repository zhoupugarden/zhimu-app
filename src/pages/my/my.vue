<template>
  <div class="container">
    <goods></goods>
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
        title: "测试title"
      }
    }

  },

  onLoad() {
    console.log("测试title");
    wx.setNavigationBarTitle({
      title: this.good.title
    });
    wx.setNavigationBarColor({
      frontColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  }

}
</script>

<style scoped>

</style>
