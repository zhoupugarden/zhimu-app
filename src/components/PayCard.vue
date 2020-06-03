<template>
  <div class="paycard-container">
    <img :src="item.picUrl" class="paycard-container__pic">
    <div class="paycard-container__name">
      {{item.productName}}
    </div>
    <div class="paycard-container_price">
      ￥{{item.salePrice}}
      <van-button plain color="#000000" size="small" @click="addToCart">添加</van-button>
    </div>
  </div>
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
    width: 150px;
    font-size: 12px;
    box-sizing: border-box;
    margin: 20px 0px;
  }
  .paycard-container__pic {
    position: relative;
    box-sizing: border-box;
    width: 150px;
    height: 100px;
  }
  .paycard-container__name {
    padding: 10px 0px;
    font-size: 14px;
  }
  .paycard-container_price {
    font-size: 14px;
    color: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
