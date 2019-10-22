<template>
  <div class="order-card-container">
    <div class="order-card__status">
      <div style="font-size: small;font-weight: lighter">
        {{orderInfo.orderNo}}
      </div>
      <div style="font-size: small; font-weight: bold">
        {{orderInfo.orderStatusDesc}}
      </div>
    </div>
    <div class="order-card__detail" @click="navigateToOrderDetail">
      <div class="order-card__detail-image">
        <img :src="orderInfo.showPicUrl" style="width: 80px;height: 80px;">
      </div>
      <div class="order-card__detail-info">
        <div style="color: red; font-size: small">
          ￥{{orderInfo.totalAmount}}
        </div>
        <div style="font-size: small; font-weight: lighter">
          {{orderInfo.orderDateTime}}
        </div>
        <div style="font-size: small;font-weight: lighter;width: 200px;">
          {{orderInfo.productListName}}
        </div>
      </div>
    </div>
    <div class="order-card__operation">
      <div style="padding: 5px" v-show="orderInfo.orderStatus === 1">
        <van-button size="small">取消订单</van-button>
      </div>
       <div v-show="orderInfo.orderStatus === 1">
         <van-button size="small" type="primary">马上付款</van-button>
       </div>
      <div v-show="orderInfo.orderStatus === 2">
        <van-button size="small" type="primary" @click="navigateToEvaluation">评价得积分</van-button>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      orderInfo:Object
    },
    data() {
    },
    methods: {
      navigateToOrderDetail() {
        var url = "/pages/orderdetail/main?orderNo=" + this.orderInfo.orderNo;
        console.log("url",url);
        wx.navigateTo({
          url
        });
      },
      navigateToEvaluation() {
        var url = "/pages/evaluation/main";
        console.log("url",url);
        wx.navigateTo({
          url
        });
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
