<template>
  <div class="redeemitem-container">

      <img :src="redeemItem.imgUrl" class="redeem-item-img">

    <div class="redeem-item-name">
        {{redeemItem.itemName}}
    </div>

    <div class="redeem-item-point">
      {{redeemItem.itemPoint}}
    </div>
    <span style="font-size: 14px; color: white">积分</span>

  </div>
</template>

<script>
  export default {
    name: "",
    props: {
      redeemItem:Object
    },
    data() {
      return {
        // redeemItem: {
        //   imgUrl:"https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
        //   itemName:"积分商品测试",
        //   itemPoint:"200"
        // }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .redeemitem-container {
    display: flex;
    flex-direction: column;
  }
  .redeem-item-img {
    width: 150px;
    height: 100px;
    border-radius: 5px;
  }
  .redeem-item-name {
    font-size: 16px;
    font-weight: bolder;
  }
  .redeem-item-point {
    font-size: 14px;
    color: #CDA65B;
  }


</style>
