<template>
  <div @click="navigateToDetail" class="redeemitem-container">

      <img :src="redeemItem.imgUrl" class="redeem-item-img">

    <div class="redeem-item-name">
        {{redeemItem.itemName}}
    </div>

    <div class="redeem-item-point">
      {{redeemItem.point}}
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
      }
    },
    methods: {
      pointRedeem() {
        this.$emit('pointRedeem', this.redeemItem);
      },
      navigateToDetail() {
        var url = "/pages/redeemdetail/main";
        wx.navigateTo({
          url
        });
      },
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
