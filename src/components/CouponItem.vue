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
    <div class="coupon-item_split"></div>
    <div class="coupon-item-right">
      <div class="coupon-item_value" :style="{color:couponInfo.status===1?'#e64340':'#B2B2B2'}">
        {{couponInfo.couponValue}}
      </div>
      <div class="coupon-item_limit">
        {{couponInfo.couponLimit}}
      </div>
    </div>
    <div v-show="couponInfo.status === 2" class="coupon-item-flag">
      <img style="width: 60px; height: 60px;" src="../asset/outdate_flag.png">
    </div>
    <div v-show="couponInfo.status === 3" class="coupon-item-flag">
      <img style="width: 60px; height: 60px;" src="../asset/used_flag.png">
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
    position: relative;
  }
  .coupon-item-left, .coupon-item-right {
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .coupon-item-container::before {
    position: absolute;
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: -5px;
    width: 5px;
    height: 40px;
    border-radius: 2px 0 0 2px;
    background: -webkit-radial-gradient(10px at left,transparent 50%,#F6327C 50%);
    background: radial-gradient(10px at left,transparent 50%,#F6327C 50%);
  }

  .coupon-item-container::after {
    position: absolute;
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: -5px;
    width: 5px;
    height: 40px;
    border-radius: 0 2px 2px 0;
    background: -webkit-radial-gradient(10px at right,transparent 50%,#F6327C 50%);
    background: radial-gradient(10px at right,transparent 50%,#F6327C 50%);
  }


  .coupon-item_limit {
    font-size: 10px;
    color: #b2b2b2;
    padding: 0px 10px;
    width: 100px;
  }
  .coupon-item_value {
    color: #e64340;
    font-size: 16px;
    padding: 10px;
  }
  .coupon-item_split {
    float:left;
    width: 1px;
    height: 60px;
    border-left: 1px dashed #b2b2b2;
  }
  .coupon-item-flag {
    position: absolute;
    top: 10px;
    right: 10px;
  }

</style>
