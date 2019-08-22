<template>
  <div class="freecard-container">
    <img :src="srcUrl" class="freecard-container__pic">
    <div class="freecard-container__name">
      {{name}} / ￥ 0.00
    </div>

    <div class="freecard-container__stepper">
      <van-stepper value="1"></van-stepper>
    </div>

    <div class="freecard-container_close">
      <van-icon name="cross"></van-icon>
    </div>
  </div>

  <!--免费配件购物车展示-->
</template>

<script>

  export default {

    props: {
      srcUrl: {
        type: String
      },
      name: {
        type: String
      },
    },
    data() {
      return {
        count: 0
      }
    }


  }
</script>
<style lang="scss"  scoped>

  .freecard-container {
    position: relative;
    padding: 5px 15px;
    font-size: 12px;
    /*color: @text-color;*/
    color: #34495e;
    /*background-color: @background-color-light;*/
    background-color: #fafafa;
    box-sizing: border-box;
    display:flex;
    justify-content: space-around;
    align-items: center;
  .freecard-container__pic {
    position: relative;
    width: 40px;
    height: 40px;
  }
  }



</style>
