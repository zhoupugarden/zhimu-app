<template>
  <div class="coupon-item-container">

    <div class="coupon-item-left">
      <div style="font-size: 18px;">
        {{couponInfo.couponName}}
      </div>
      <div style="font-size: 10px;">
        有效期至：{{couponInfo.validEndTime}}
      </div>
    </div>
    <hr style="float: left;margin-top:30px;margin-bottom:30px;margin-right: 30px;border: thin dashed #aaa;">
    <div class="coupon-item-right">
      <div style="color: red;text-align: center;font-size: 20px;">
        {{couponInfo.couponValue}}
      </div>
      <div style="font-size: 10px;">
        {{couponInfo.couponLimit}}
      </div>
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
    },
  }
</script>

<style lang="scss" scoped>
  .coupon-item-container {
    background-color: white;
    margin: 8px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .coupon-item-left, .coupon-item-right {
    display: flex;
    flex-direction: column;
  }

</style>
