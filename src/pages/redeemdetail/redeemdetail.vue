<template>
  <div class="redeemdetail-container">
    <div class="redeemdetail-header">
      <div class="redeemdetail-pic">
        <img :src="redeemItem.imgUrl" class="redeemdetail-pic-item">
      </div>
      <div class="redeemdetail-header-content">
        <div style=" font-size: 14px;">
          {{redeemItem.redeemName}}
        </div>
        <div style="color: #FFC300; font-size: 14px; font-weight: bold; ">
          {{redeemItem.pointCount}}积分
        </div>
      </div>
    </div>

    <div class="redeemdetail-desc">
      <div style="font-size: 14px; font-weight: bold; padding-top: 10px;">兑换说明</div>
      <div style="font-size: 12px;padding-bottom: 10px;">
        {{redeemItem.redeemDesc}}
      </div>
    </div>
    <div class="redeemdetail-operation">
      <div style="font-size: 14px; width: 60%; width: 60%;display: flex;align-items: center;justify-content: center;">
        <div>
          需{{redeemItem.pointCount}}积分
        </div>
      </div>
      <div style="width: 40%">
        <van-button custom-class = "redeem-detail-class"
                    @click="pointRedeem"
                    color="#FFC300" size="normal">兑换</van-button>
      </div>
    </div>

  </div>
</template>

<script>
  import {POINT_REDEEM, GET_POINT_MALL_DETAIL} from '@/utils/api';
  import {request} from "@/utils/request";
  import {pageUrlEnum} from "@/utils/enums";

  export default {
    data() {
      return {
        redeemItem:{},
        popShow:false
      }
    },
    methods: {
      getMallDetail(params) {
        request(
          GET_POINT_MALL_DETAIL,
          'GET',
          params
        ).then(
          response => {
            this.redeemItem = response;
          }
        )
      },
      pointRedeem() {
        let param = {};
        param.pointMallId = this.redeemItem.id;
        request(
          POINT_REDEEM,
          'post',
          param
        ).then(
          (response) => {
            wx.showModal({
              title: "提示",
              content: '优惠券兑换成功!',
              confirmText: '去看看',
              showCancel: true,
              success(res) {
                if(res.confirm) {
                  wx.navigateTo(
                    {
                      url:pageUrlEnum.coupon_url
                    }
                  )
                }
              }
            });
          }
        )
      }
    },

    onShow() {
      let params = this.$root.$mp.query;
      this.getMallDetail(params);
    },

  }
</script>

<style lang="scss" scoped>
  @import "redeemdetail.scss";
</style>

<style lang="scss">
  .redeem-detail-class {
    width: 100%;
  }

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
