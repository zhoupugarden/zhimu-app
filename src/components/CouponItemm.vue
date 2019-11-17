<template>
  <div class="coupon-item-container">
    <div class="coupon-item-left">
      <div style="font-size: 18px;padding-top: 30%;">
        {{couponInfo.couponName}}
      </div>
      <div style="font-size: 10px;">
        有效期至：{{couponInfo.validEndTime}}
      </div>
    </div>
    <hr style="float: left;margin-top:30px;margin-bottom:30px;margin-right: 30px;border: thin dashed #aaa;">
    <div class="coupon-item-right">
      <div style="padding-top: 40%;text-align: center;font-size: 20px;">
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
  }
  .coupon-item-flag {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
</style>
