<template>
  <div class="order-card-container">
    <div class="order-card__status">
      <div style="font-size: small;font-weight: lighter">
        {{orderInfo.orderNo}}
      </div>
      <div style="font-size: small; font-weight: bold">
        {{orderInfo.orderStatus}}
      </div>
    </div>
    <div class="order-card__detail">
      <div class="order-card__detail-image">
        <img :src="orderInfo.orderUrl" style="width: 80px;height: 80px;">
      </div>
      <div class="order-card__detail-info">
        <div style="color: red; font-size: small">
          ￥{{orderInfo.price}}
        </div>
        <div style="font-size: small; font-weight: lighter">
          {{orderInfo.orderTime}}
        </div>
        <div style="font-size: small;font-weight: lighter;width: 200px;">
          {{orderInfo.orderListName}}
        </div>
      </div>
    </div>
    <div class="order-card__operation">
      <div style="padding: 5px">
        <van-button size="small">取消订单</van-button>
      </div>
       <div>
         <van-button size="small" type="primary">马上付款</van-button>
       </div>
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
          orderListName:"杨宇测试|测试|依依 毒贩夫妇付 杨宇测试|测试|依依 毒贩夫妇付 "
        }
      }
    }

  }
</script>
<style lang="scss"  scoped>
  .order-card-container {
    position: relative;
    background-color: white;
    margin-top: 10px;
  .order-card__status {
    padding: 5px 8px;
    display: flex;
    justify-content: space-between;
    height: 30px;
  }

  .order-card__detail {
    display: flex;
    position: relative;
    justify-content: flex-start;
    padding-top : 5px;
    padding-bottom : 5px;
    box-sizing: border-box;
  .order-card__detail-image {
    box-sizing: border-box;
    padding-right: 8px;
    padding-left: 8px;
  }
  .order-card__detail-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  }

  /*line如何水平居中显示*/
  .order-card__detail:before {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 1px;
    background: lightgray;
  }

  .order-card__detail:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 90%;
    height: 1px;
    background: lightgray;
  }


  .order-card__operation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 5px 8px;
    height: 40px;
  }
  }
</style>
