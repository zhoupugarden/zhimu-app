<template>
  <div class="order-card-container">
    <div class="order-card__status">
      {{orderInfo.orderNo}} {{orderInfo.orderStatus}}
    </div>
    <div class="order-card__detail">
      <div class="order-card__detail-image">
        <img :src="orderInfo.orderUrl">
      </div>
      <div class="order-card__detail-info">
        <div style="color: red">
          {{orderInfo.price}}
        </div>
        <div style="font-size: small; font-weight: lighter">
          {{orderInfo.orderTime}}
        </div>
        <div>
          {{orderInfo.orderListName}}
        </div>
      </div>
    </div>
    <div class="order-card__operation">
      <van-button size="small">取消订单</van-button>
      <van-button size="small">马上付款</van-button>
    </div>
  </div>

</template>

<script>
  export default {
    // props: {
    //   orderInfo:Object
    // },
    data() {
      return {
        orderInfo : {
          orderUrl:"https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
          orderNo:"1233",
          orderStatus:"待支付",
          price:"12.22",
          orderTime:"2019-10-10 10:10:10",
          orderListName:"杨宇测试|测试|依依"
        }
      }
    }

  }
</script>
<style lang="scss"  scoped>
  .order-card__detail {
    display: flex;
    justify-content: flex-start;
  }
  

</style>
