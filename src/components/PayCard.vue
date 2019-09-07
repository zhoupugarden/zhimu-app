<template>
  <div class="paycard-container">
    <img :src="item.url" class="paycard-container__pic">
    <div class="paycard-container__name">
      {{item.productName}}
    </div>
    <div class="paycard-container_price">
      ￥{{item.salePrice}}
      <van-button size="small" @click="addToCart">添加</van-button>
    </div>
  </div>
  <!--免费配件购物车展示-->
</template>

<script>
  export default {
    props: {
      item:Object

    },
    data() {
      return {

      }
    },
    methods: {
      addToCart() {
        this.$emit('addToCart', this.item)
      }
    }

  }
</script>
<style lang="scss"  scoped>

  .paycard-container {
    position: relative;
    width: 120px;
    font-size: 12px;
    /*color: @text-color;*/
    color: #34495e;
    /*background-color: @background-color-light;*/
    background-color: #fafafa;
    box-sizing: border-box;
  .paycard-container__pic {
    position: relative;
    box-sizing: border-box;
    width: 120px;
    height: 90px;
  }
  .paycard-container__name {
    font-weight: bold;
    padding-bottom: 10px;
    padding-top: 10px;
  }
  .paycard-container_price {
    font-weight: lighter;
    font-size: small;
    color: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  }
  

</style>
