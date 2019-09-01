<template>
  <div class="coupon-container">
    <van-tabs :active="active"
              custom-class="van-tabs__custom"
              @change="onChange">
      <van-tab
        tab-class="van-tabs__custom"
        title="可使用">
        <div class="coupon-list">
          <coupon-item></coupon-item>
          <coupon-item></coupon-item>
          <coupon-Offitem></coupon-Offitem>
          <div class="coupon-redeem">
            <van-button custom-class="van-button__custom" @click="navgateToPointRedeem">兑换优惠券</van-button>
          </div>
        </div>
      </van-tab>
      <van-tab title="已使用">
        <div class="coupon-list">
          <coupon-useditem></coupon-useditem>
        </div>
      </van-tab>
      <van-tab title="已过期">
        <div class="coupon-list">
          <coupon-outitem></coupon-outitem>
        </div>
      </van-tab>
    </van-tabs>



  </div>
</template>

<script>
  import CouponItem from '@/components/CouponItem';
  import CouponOutitem from '@/components/CouponOutitem';
  import CouponUseditem from '@/components/CouponUseditem';
  import CouponOffitem from '@/components/CouponOffitem';
  export default {
    components: {
      CouponItem,CouponOutitem,CouponOffitem,CouponUseditem
    },
    data() {
      return {
        balanceRecords: {
          total: 798
        }
      }
    },
    methods: {
      navgateToPointRedeem() {
        var url = "/pages/pointredeem/main";
        console.log("url",url)
        wx.navigateTo({
          url
        });
      }

    }

  }
</script>

<style lang="scss" scoped>

  .balance-summary__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    font-size: 12px;
  }
  .balance-summary__total {
    background-color: white;
    font-size: 30px;
    color: green;
    display: flex;
    justify-content: center;
  }
  .coupon-redeem {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>

<style lang="scss">
  .cell-balance-class {
    font-size: 12px;
    color: green;
  }
  .van-tabs__custom {
    width: 100%;
    height: 100%;
  }
  .van-button__custom {
    width: 100%;
  }


</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
