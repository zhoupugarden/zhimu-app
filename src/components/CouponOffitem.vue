<template>
  <div class="basic-style">
    <div :class="coupon">
      <div :class="mainCoupon">
        <p class="coupon-shop">zhimu蛋糕</p>
        <p class="coupon-subtype">免邮</p>
        <p class="coupon-valid-date">有效期至 2019-08-31</p>
      </div>
      <div class="vice-coupon">
        <div style="font-size: 14px;">线下券</div>
        <div style="padding: 5px 0px">
          <van-button type="primary" size="mini">二维码</van-button>
        </div>
        <div>
          <van-button type="info" size="mini">使用方式</van-button>

        </div>
      </div>
      <i></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",

    data() {
      return {
        a : 1
      }
    },

    computed: {

      //可以根据优惠券的类型，计算属性，显示不同的颜色区别，#F39B00 根据该值显示背景颜色
      coupon() {
        return 'coupon';
      },

      mainCoupon() {
        return 'main-coupon';
      }

    }
  }
</script>

<style lang="scss" scoped>
  .basic-style {
    padding: 0;
    margin: 5px 5px 0px 5px;
    color: rgb(255, 255, 255);
    font-family: "Microsoft YaHei";
    font-size: 13px;
  }
  /* basic style */
  .coupon {
    position: relative;
    display: flex;
    overflow: hidden;
    background-color: #F39B00;
    background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(255, 0, 0, 0) 5px, #F39B00 5px);
    background-size: 15px 15px;
    background-position: 9px 3px;
    height: 90px;
    margin-top: 10px;
  }

  .coupon:before {
    content: '';
    position: absolute;
    top:0;
    bottom:0;
    left:10px;
    right:10px;
    z-index: -1;
    background-color:#F39B00;
  }

  .coupon i{
    position: absolute;
    left: 20%;
    top: 45px;
    height: 190px;
    width: 390px;
    background-color: rgba(255, 255, 255, .15);
    transform: rotate(-30deg);
  }

  .main-coupon {
    float: left;
    width: 220px;
    height: 100%;
    border-right: 2px dashed rgba(255, 255, 255, 0.3);
    padding: 5px;
  }

  .vice-coupon {
    padding: 15px;
    text-align: center;
  }

  .coupon-subtype {
    font-size: 30px;
    margin-left: 55px;
  }
  .coupon-valid-date {
    margin-top: 10px;
    text-align: center;
  }
  .coupon-type {
    font-size: 20px;
  }
  .coupon-desc {
    font-size: 12px;
    margin-top: 10px;
  }
  .coupon-shop {
    font-size: 12px;
    margin-left: 10px;
  }
  .outdate-coupon {
    position: absolute;
    right: 10px;
  }

</style>
