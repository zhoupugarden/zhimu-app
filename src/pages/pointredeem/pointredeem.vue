<template>
  <div class="redeem-container">

    <div class="redeem-header">
      <div class="redeem-header-total">
        <div style="color: #CDA65B">
          78
        </div>
        <div style="color: #ACC0D8; font-size: 14px">
          可用积分
        </div>
      </div>
      <div class="redeem-header-operation">
        <div class="redeem-header-operation_left" @click="navigateToPoint">积分明细</div>
        <div class="redeem-header-operation_split"></div>
        <div class="redeem-header-operation_right" @click="navigateToCoupon">兑换记录</div>
      </div>

    </div>
    <div style="font-size: 14px; font-weight:bolder; padding-top: 10px;padding-left: 10px;color: #CDA65B; background-color: white">
      优惠券专区
    </div>
    <div class="redeem-detail">
      <div class="redeem-detail-item" v-for="(item, index) in redeemItems" :key="index">
        <redeem-item :redeemItem="item"></redeem-item>
      </div>
    </div>

  </div>
</template>

<script>
  import RedeemItem from '@/components/RedeemItem';

  export default {
    components: {
      RedeemItem
    },
    data() {
      return {
        balanceRecords: {
          total: 798
        },
        redeemItems:[
          {
            imgUrl:"https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
            itemName:"积分商品测试",
            itemPoint:"200"
          },
          {
            imgUrl:"https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
            itemName:"积分商品测试",
            itemPoint:"200"
          },
          {
            imgUrl:"https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
            itemName:"积分商品测试",
            itemPoint:"200"
          },
          {
            imgUrl:"https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
            itemName:"积分商品测试",
            itemPoint:"200"
          }
        ]


      }
    },
    methods: {
      navigateToPoint() {
        var url = "/pages/point/main";
        wx.navigateTo({
          url
        });
      },
      navigateToCoupon() {
        var url = "/pages/coupon/main";
        wx.navigateTo({
          url
        });
      }
    }

  }
</script>

<style lang="scss" scoped>

  .redeem-header-total {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 5px 0px;

  }

  .redeem-header-operation {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    padding: 10px 0px;
  }

  .redeem-header-operation_left {
    font-size: 14px;
    font-weight: bolder;
  }
  .redeem-header-operation_right {
    font-size: 14px;
    font-weight: bolder;
  }
  .redeem-header-operation_split {
    float:left;
    width: 1px;
    height: 20px;
    background: #e6ebf3;
  }
  .redeem-detail {
    background-color: white;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    padding-top: 10px;
  }
  .redeem-detail-item {
    flex: 0 0 33%;
    padding: 10px 10px;
  }


</style>

<style lang="scss">

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
