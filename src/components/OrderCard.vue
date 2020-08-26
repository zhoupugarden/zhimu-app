<template>
  <div class="order-card-container">
    <div class="order-card__status">
      <div style="font-size: 12px;">
        {{orderInfo.orderNo}}
      </div>
      <div style="font-size: 12px; ">
        {{orderStatusDesc}}
      </div>
    </div>
    <div class="order-card__detail" @click="navigateToOrderDetail">
      <div class="order-card__detail-image">
        <img :src="orderInfo.showPicUrl" style="width: 80px;height: 80px;">
      </div>
      <div class="order-card__detail-info">
        <div style="color: red; font-size: 12px">
          ￥{{orderInfo.totalAmount}}
        </div>
        <div style="font-size: 12px; font-weight: lighter">
          {{orderInfo.orderDateTime}}
        </div>
        <div style="font-size: 12px;width: 200px;">
          {{orderInfo.productListName}}
        </div>
      </div>
    </div>
    <div class="order-card__operation">
      <div style="padding: 5px" v-show="orderInfo.orderStatus === orderStatusEnum.INIT.value">
        <van-button size="small" @click="cancelOrder">取消订单</van-button>
      </div>
       <div v-show="orderInfo.orderStatus === orderStatusEnum.INIT.value">
         <van-button  color="#000000" size="small" type="primary" @click="payOrder">立即支付</van-button>
       </div>
      <div v-show="orderInfo.orderStatus === orderStatusEnum.have_signed.value && !orderInfo.isComment">
        <van-button color="#000000" size="small" type="primary" @click="navigateToEvaluation">评价得积分</van-button>
      </div>
    </div>

    <van-dialog id="van-dialog" />

  </div>

</template>
<script>

  import {CANCEL_ORDER,MOCK_WX_PAY, PAY_ORDER} from '@/utils/api';
  import {request} from "@/utils/request";
  import Dialog from '../../static/vant/dialog/dialog';

  import {pageUrlEnum, orderStatusEnum} from "@/utils/enums";

  export default {
    props: {
      orderInfo:Object
    },
    data() {
      return {
        orderStatusEnum:orderStatusEnum
      }
    },
    methods: {
      navigateToOrderDetail() {
        let url = pageUrlEnum.order_detail_url + "?orderNo=" + this.orderInfo.orderNo;
        wx.navigateTo({
          url
        });
      },
      navigateToEvaluation() {
        let url = pageUrlEnum.evaluation_url + "?orderNo=" + this.orderInfo.orderNo;
        wx.navigateTo({
          url
        });
      },
      cancelOrder() {
        let that = this;
        wx.showActionSheet({
          itemList:["取消订单"],
          success: function(res) {
            if(res.tapIndex === 0){
              let orderNo = that.orderInfo.orderNo;
              let data = {};
              data.orderNo = orderNo;
              request(
                CANCEL_ORDER,
                'post',
                data
              ).then(
                response => {
                  console.log("取消订单响应：", response);
                  that.orderInfo.orderStatus = orderStatusEnum.cancelled.value;
                  that.orderInfo.orderStatusDesc = orderStatusEnum.cancelled.desc;
                }
              )
            } else {

            }
          },
        });
      },

      mockWxPay(data) {
        let that = this;
        request(
          MOCK_WX_PAY,
          'POST',
          data
        ).then(
          response => {
            console.log("this response", response);
            let params = {};
            params.orderNo = this.orderNo;
            that.orderInfo.orderStatus = orderStatusEnum.has_pay;
            that.orderInfo.orderStatusDesc = "已支付";
          }
        )
      },
      payOrder() {
        let that = this;
        let orderNo = this.orderInfo.orderNo;
        let data = {};
        data.orderNo = orderNo;
        request(
          PAY_ORDER,
          'post',
          data
        ).then(
          response => {
          //  在这里需要调用微信支付
            let params = {};
            params.unifiedOrderNo = response.unifiedOrderNo;
            params.orderNo = response.orderNo;
            params.amount = response.amount;
            let data = {};
            data.out_trade_no = params.orderNo;
            data.transaction_id = params.unifiedOrderNo;
            data.total_fee = params.amount;
            Dialog.confirm({
              title: '微信支付',
              message:'确认支付' + params.amount + '元'
            }).then(() => {
              that.mockWxPay(data);
            }).catch(() => {
              // on cancel
              console.log("取消微信支付")
            });
          }
        )
      }
    },
    computed: {
      orderStatusDesc() {
        if (this.orderInfo.orderStatus === orderStatusEnum.INIT.value) {
          return orderStatusEnum.INIT.desc;
        }
        if (this.orderInfo.orderStatus === orderStatusEnum.has_pay.value || this.orderInfo.orderStatus === orderStatusEnum.make_done.value || this.orderInfo.orderStatus === orderStatusEnum.accepted.value) {
          return orderStatusEnum.has_pay.desc;
        }
        if (this.orderInfo.orderStatus === orderStatusEnum.deliverd.value) {
          return orderStatusEnum.deliverd.desc;
        }
        if (this.orderInfo.orderStatus === orderStatusEnum.have_signed.value) {
          return orderStatusEnum.have_signed.desc;
        }
        if (this.orderInfo.orderStatus === orderStatusEnum.cancelled.value) {
          return orderStatusEnum.cancelled.desc;
        }
        if (this.orderInfo.orderStatus === orderStatusEnum.closed.value) {
          return orderStatusEnum.closed.desc;
        }
        if (this.orderInfo.orderStatus === orderStatusEnum.closed_auto.value) {
          return orderStatusEnum.closed_auto.desc;
        }
        if (this.orderInfo.orderStatus === orderStatusEnum.refunding.value) {
          return orderStatusEnum.refunding.desc;
        }
        if (this.orderInfo.orderStatus === orderStatusEnum.refund.value) {
          return orderStatusEnum.refund.desc;
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
  }
  .order-card__status {
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;
  }

  .order-card__detail {
    display: flex;
    position: relative;
    justify-content: flex-start;
    padding-top: 5px;
    padding-bottom: 5px;
    box-sizing: border-box;
    border-bottom: 1px solid #f2f2f2;
    border-top: 1px solid #f2f2f2;
    margin: 0px 10px;
  }

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

  .order-card__operation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 5px 8px;
    height: 40px;
  }

</style>
