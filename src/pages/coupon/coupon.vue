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
            <coupon-item :couponInfo="item"></coupon-item>
          </div>
        </div>
      </van-tab>
      <van-tab title="已过期">
        <div class="coupon-list">
          <div v-for="(item, index) in couponInvalidList" :key="index">
            <coupon-item :couponInfo="item"></coupon-item>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import CouponItem from '@/components/CouponItem';
  import {couponStatusEnum} from '@/utils/enums';
  import {GET_COUPON_BY_USER_ID} from '@/utils/api';
  import {request} from "@/utils/request";
  import {pageUrlEnum} from '@/utils/enums'

  export default {
    components: {
      CouponItem
    },
    data() {
      return {
        couponList:[],
        active:0
      }
    },
    methods: {
      onChange(event) {
        this.active = event.mp.detail.index;
      },
      navgateToPointRedeem() {
        wx.navigateTo({
          url:pageUrlEnum.point_redeem_url
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
          }
        )
      }
    },
    computed: {
      couponValidList() {
        return this.couponList.filter(item => {
          return item.status === couponStatusEnum.valid.value;
        })
      },
      couponUsedList() {
        return this.couponList.filter(item => {
          return item.status === couponStatusEnum.used.value;
        })
      },
      couponInvalidList() {
        return this.couponList.filter(item => {
          return item.status === couponStatusEnum.expired.value;
        })
      },
    },
    onShow() {
      let data = {};
      this.getCoupon(data);
    },

    // onUnload() {
    //   this.active = 0;
    //   this.couponList = [];
    //   let pages = getCurrentPages();
    //   let prePage = pages[pages.length -2];
    //   let preUrl = prePage.route;
    //     wx.switchTab({
    //         url : pageUrlEnum.my_url
    //       }
    //     )
    // }

  }
</script>

<style lang="scss" scoped>
  @import "coupon.scss";
</style>

<style lang="scss">
  .cell-balance-class {
    font-size: 12px;
    color: #09BB07;
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
