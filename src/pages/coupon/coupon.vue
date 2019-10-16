<template>
  <div class="coupon-container">
    <van-tabs :active="active"
              custom-class="van-tabs__custom"
              @change="onChange">
      <van-tab
        tab-class="van-tabs__custom"
        title="可使用">
        <div class="coupon-list">
          <div v-for="(item, index) in couponValidList" :key="index">
            <coupon-item :couponInfo="item"></coupon-item>
          </div>
          <div class="coupon-redeem">
            <van-button custom-class="van-button__custom" @click="navgateToPointRedeem">兑换优惠券</van-button>
          </div>
        </div>
      </van-tab>
      <van-tab title="已使用">
        <div class="coupon-list">
          <div v-for="(item, index) in couponInValidList" :key="index">
            <coupon-useditem :couponInfo="item"></coupon-useditem>
          </div>
        </div>
      </van-tab>
      <van-tab title="已过期">
        <div class="coupon-list">
          <div v-for="(item, index) in couponUsedList" :key="index">
            <coupon-useditem :couponInfo="item"></coupon-useditem>
          </div>
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

  import {GET_COUPON_BY_USER_ID} from '@/utils/api';
  import {request} from "@/utils/request";

  export default {
    components: {
      CouponItem,CouponOutitem,CouponOffitem,CouponUseditem
    },
    data() {
      return {
        couponList:[],
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
      },

      getCoupon(data) {

        request(
          GET_COUPON_BY_USER_ID,
          'GET',
          data
        ).then(
          response => {
            this.couponList = response;
            console.log("this response", response);
          }
        )

      }
    },
    computed: {
      couponValidList() {
        return this.couponList.filter(item => {
          return item.status === 1
        })
      },
      couponInValidList() {
        return this.couponList.filter(item => {
          return item.status === 2
        })
      },
      couponUsedList() {
        return this.couponList.filter(item => {
          return item.status === 3
        })
      }
    },


    onShow() {

      let params = this.$root.$mp.query;
      console.log(this.$root.$mp.query);
      let data = {};
      data.userId = params.userId;

      this.getCoupon(data);
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
