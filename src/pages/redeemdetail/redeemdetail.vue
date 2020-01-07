<template>
  <div class="redeemdetail-container">
    <div class="redeemdetail-header">
      <div class="redeemdetail-pic">
        <img :src="redeemItem.imgUrl" class="redeemdetail-pic-item">
      </div>
      <div class="redeemdetail-header-content">
        <div style=" font-size: 16px;  font-family: 'Microsoft YaHei'">
          {{redeemItem.couponName}}
        </div>
        <div style="color: #CDA65B; font-size: 14px; font-weight: bold; font-family: 'Microsoft YaHei'">
          {{redeemItem.pointCount}}积分
        </div>
      </div>
    </div>

    <div class="redeemdetail-desc">
      <div style="font-size: 18px; font-weight: bold; font-family: 'Microsoft YaHei'">兑换说明</div>
      {{redeemItem.redeemDesc}}
    </div>
    <div class="redeemdetail-operation">
      <div style="width: 60%;  ">
        需{{redeemItem.pointCount}}积分
      </div>
      <div style="width: 40%">
        <van-button custom-class = "redeem-detail-class"
                    @click="pointRedeem"
                    type="primary" size="normal">兑换</van-button>
      </div>
    </div>

  </div>
</template>

<script>

  import {POINT_REDEEM, GET_POINT_MALL_DETAIL} from '@/utils/api';
  import { mapGetters} from 'vuex';
  import {request} from "@/utils/request";

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
            //将userID放在存储中
            console.log("response",response)
            this.redeemItem = response;
          }
        )

      },

      pointRedeem() {
        console.log("pointRedeem", this.redeemItem)
        let param = {};
        param.userId = this.userId;
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
                      url:'/pages/coupon/main'
                    }
                  )
                }
              }
            });
          }
        )
      }
    },
    computed: {
      ...mapGetters(
        [
          'userId'
        ]
      )
    },
    onShow() {
      let params = this.$root.$mp.query;
      console.log(" detail: ", this.$root.$mp.query);
      this.getMallDetail(params);
    },

  }
</script>

<style lang="scss" scoped>
  .redeemdetail-container {

  }
  .redeemdetail-header {
    background-color: white;
  }
  .redeemdetail-pic {
    width: 100%;
    height: 200px;
    background-color: #F4F4F4;
  }
  .redeemdetail-header-content {
    padding: 10px 5px;
  }
  .redeemdetail-desc {
    margin-top: 10px;
    white-space: pre-line;
    background-color: white;
    padding-left: 5px;
  }

  .redeemdetail-pic-item {
    width: 80%;
    height: 80%;
    border-radius: 5px;
    margin: 5% 10%;
  }
  .redeemdetail-operation {
    position: fixed;
    bottom: 0px;
    display: flex;
    background-color: white;
    width: 100%;
  }


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
