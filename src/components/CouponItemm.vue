<template>
  <div class="coupon-item-container">
    <div class="coupon-item-left">
      <div style="font-size: 16px;padding: 10px;">
        {{couponInfo.couponName}}
      </div>
      <div style="font-size: 10px;">
        {{couponInfo.validEndTime}} 至 {{couponInfo.validEndTime}}
      </div>
    </div>
    <div style="font-size: 10px;color: #b2b2b2; padding: 0px 10px; border: 1px solid #b2b2b2;"></div>
    <div class="coupon-item-right">
      <div style="padding: 10px;font-size: 16px;">
        {{couponInfo.couponValue}}
      </div>
      <div style="font-size: 10px;">
        {{couponInfo.couponLimit}}
      </div>
    </div>

    <div v-if="couponInfo.status === 2" class="coupon-item-flag">
      <img style="width: 40px; height: 40px;" src="../asset/outdate.png">
    </div>
    <div v-else class="coupon-item-flag">
      <img style="width: 40px; height: 40px;" src="../asset/used.png">
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props:{
      couponInfo: Object
    },
    data() {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .coupon-item-container {
    position: relative;
    background-color: white;
    margin: 8px;
    height: 90px;
    display: flex;
    justify-content: space-around;
  }
  .coupon-item-left, .coupon-item-right {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .coupon-item-flag {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
</style>
