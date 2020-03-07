<template>
  <div class="coupon-item-container">

    <div class="coupon-item-left">
      <div style="font-size: 16px; padding: 10px;">
        {{couponInfo.couponName}}
      </div>
      <div style="font-size: 10px;">
        {{couponInfo.validStartTime}} 至 {{couponInfo.validEndTime}}
      </div>
    </div>
    <div style="float:left;width: 1px;height: 60px; background: #b2b2b2;"></div>
    <div class="coupon-item-right">
      <div style="color: red;font-size: 16px; padding: 10px;">
        {{couponInfo.couponValue}}
      </div>
      <div style="font-size: 10px;color: #b2b2b2; padding: 0px 10px; border: 1px solid #b2b2b2;">
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
    text-align: center;
  }

</style>
