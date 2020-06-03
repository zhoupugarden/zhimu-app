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
      <div style="padding: 5px" v-show="orderInfo.orderStatus === 1">
        <van-button size="small" @click="cancelOrder">取消订单</van-button>
      </div>
       <div v-show="orderInfo.orderStatus === 1">
         <van-button  color="#000000" size="small" type="primary" @click="payOrder">立即支付</van-button>
       </div>
      <div v-show="orderInfo.orderStatus === 5 && orderInfo.isComment === 0">
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
  export default {
    props: {
      orderInfo:Object
    },
    data() {
      return {
      }
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
        var url = "/pages/evaluation/main?orderNo=" + this.orderInfo.orderNo;
        console.log("url",url);
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
                  that.orderInfo.orderStatus = 99;
                  that.orderInfo.orderStatusDesc = "已取消";
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
            //  微信支付成功后，跳转到myvip页面
            let params = {};
            params.orderNo = this.orderNo;
            that.orderInfo.orderStatus = 2;
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
            console.log("支付订单响应：", response);
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
        if (this.orderInfo.orderStatus === 1) {
          return "待支付";
        }
        if (this.orderInfo.orderStatus === 2) {
          return "已支付";
        }
        if (this.orderInfo.orderStatus === 5) {
          return "已配送";
        }
        if (this.orderInfo.orderStatus === 99) {
          return "订单取消";
        }
        if (this.orderInfo.orderStatus === 100) {
          return "订单完成";
        }
        if (this.orderInfo.orderStatus === 101) {
          return "退款完成";
        }
        if (this.orderInfo.orderStatus === 3 || this.orderInfo.orderStatus === 4) {
          return "已支付";
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
