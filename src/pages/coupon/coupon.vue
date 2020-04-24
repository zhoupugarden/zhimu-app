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
        </div>
        <div class="coupon-redeem">
          <van-button custom-class="van-button__custom" @click="navgateToPointRedeem">兑换优惠券</van-button>
        </div>
      </van-tab>
      <van-tab title="已使用">
        <div class="coupon-list">
          <div v-for="(item, index) in couponUsedList" :key="index">
            <coupon-itemm :couponInfo="item"></coupon-itemm>
          </div>
        </div>
      </van-tab>
      <van-tab title="已过期">
        <div class="coupon-list">
          <div v-for="(item, index) in couponInvalidList" :key="index">
            <coupon-itemm :couponInfo="item"></coupon-itemm>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import CouponItem from '@/components/CouponItem';
  import CouponItemm from '@/components/CouponItemm';
  import { mapGetters} from 'vuex';


  import {GET_COUPON_BY_USER_ID} from '@/utils/api';
  import {request} from "@/utils/request";

  export default {
    components: {
      CouponItem, CouponItemm
    },
    data() {
      return {
        couponList:[],
        active:0
      }
    },
    methods: {

      onChange(event) {
        console.log("event", event);
        this.active = event.mp.detail.index;
      },


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
      couponUsedList() {
        return this.couponList.filter(item => {
          return item.status === 3
        })
      },
      couponInvalidList() {
        return this.couponList.filter(item => {
          return item.status === 2
        })
      },
    },
    onShow() {
      let data = {};
      this.getCoupon(data);
    },

    onUnload() {
      this.active = 0;
      this.couponList = [];
      let pages = getCurrentPages();
      let prePage = pages[pages.length -2];
      let preUrl = prePage.route;
        wx.switchTab({
            url : "/pages/my/main"
          }
        )
    }



  }
</script>

<style lang="scss" scoped>
  @import "coupon.scss";
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
