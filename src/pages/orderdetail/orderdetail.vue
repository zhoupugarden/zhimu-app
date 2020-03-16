<template>
  <div class="order-detail-container">

    <van-tabs :active="active" @change="onChange">
      <van-tab title="订单详情">
        <div>
          <div style="background-color: white">
            <div v-for="(detail_, index) in orderProductDetailList" :key="index" class="order-item-detail">
              <product-item :productItemInfo="detail_"></product-item>
            </div>
            <div v-for="(item , index) in orderInfo.extroInfos" :key="index" class="order-freeitem-detail">
              <div style="display: flex; justify-content: space-between" >
                <div>
                  <span>
                    {{item.productName}}
                  </span>
                  <span v-show="item.value">
                    ({{item.value}})
                  </span>
                </div>
                <div>
                  x {{item.quantity}}
                </div>
              </div>
            </div>

            <div class="order-total-info">
              <van-cell title="商品总计" :value="flag + orderInfo.productAmount" />
            </div>
            <div v-show = "orderInfo.deliverAmount > 0" class="order-deliver-info">
              <van-cell title="配送费" :value="flag + orderInfo.deliverAmount" />
            </div>

            <div class="order-deliver-info">
              <van-cell title="余额抵扣" :value="'-' + flag + orderInfo.balanceAmount" />
            </div>

            <div v-if="orderInfo.couponAmount > 0" class="order-coupon-detail">
              <div style="display: flex;align-items: center;">
                <img src="../../asset/coupon_dis.png" class="coupon-img">
                <div>
                  {{orderInfo.couponDesc}}
                </div>
              </div>
              <div style="color: #969799;">
                {{ '-' + flag + orderInfo.couponAmount}}
              </div>
            </div>

            <div class="order-need-info">
              <van-cell value-class = "order-need-info_value_class" title="需付" :value="flag + orderInfo.needPayAmount" />
            </div>
            <div class="merchant-contact-info" @click="callCustomerPhone">
              <van-cell icon="phone-o" title="联系客服">
              </van-cell>
            </div>
          </div>
        <div style="font-size: 14px;padding: 10px 15px;">
          配送信息
        </div>
        <div class="order-deliver-info">
          <van-cell-group>
            <van-cell title="期望时间" :value="orderInfo.expectDeliverTime" />
            <van-cell title="配送地址" :value="orderInfo.expectDeliverAddress" />
            <van-cell title="配送服务" :value="deliverDesc" />
          </van-cell-group>
        </div>
        <div style="font-size: 14px;padding: 10px 15px;">
          订单信息
        </div>
        <div class="order-order-info">
          <van-cell-group>
            <van-cell title="订单号码" :value="orderInfo.orderNo" />
            <van-cell title="订单时间" :value="orderInfo.orderTime" />
            <van-cell title="支付方式" :value="orderInfo.payTypeDesc" />
            <van-cell title="订单状态" :value="orderInfo.orderStatusDesc" />
          </van-cell-group>
        </div>

        <div v-if = "orderInfo.orderStatus === 1" class="order-submit-button">
          <van-button custom-class="custom-button"
                      @click="orderPay"
                      type="primary"
          >立即支付</van-button>
        </div>
        </div>
      </van-tab>
      <van-tab title="订单状态">
        <van-steps
          :steps="steps"
          :active="activeStepIndex"
          direction="vertical"
          active-color="#f44"
        />
      </van-tab>
    </van-tabs>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>

  import ProductItem from '@/components/ProductItem';
  import {GET_ORDER_DETAIL, GET_ORDER_LOG, PAY_ORDER, MOCK_WX_PAY} from '@/utils/api';
  import {request} from "@/utils/request";
  import Dialog from '../../../static/vant/dialog/dialog';

  export default {
    components: {
      ProductItem
    },

    data() {
      return {
        flag: '￥',
        active:0,
        orderInfo: {},
        orderProductDetailList: {},
        steps: [],
        orderNo:"",
        activeStepIndex:0

      }
    },
    methods: {
      onChange(event) {
        console.log("event:", event);
        if (event.mp.detail.index === 1) {
          this.getOrderLog();
        }else {
          let params = {};
          params.orderNo = this.orderNo;
          this.getOrderDetail(params);
        }
      },
      orderPay() {
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
            let data = {};
            data.out_trade_no = response.orderNo;
            data.transaction_id = response.unifiedOrderNo;
            data.total_fee = response.amount;
            Dialog.confirm({
              title: '微信支付',
              message:'确认支付' + data.total_fee + '元'
            }).then(() => {
              that.mockWxPay(data);
            }).catch(() => {
              // on cancel
              console.log("取消微信支付")
            });
          }
        )
      },

      mockWxPay(data) {
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
            this.getOrderDetail(params);
          }
        )
      },

      getOrderLog() {
        let params = {};
        params.orderNo = this.orderNo;
        request(
          GET_ORDER_LOG,
          'GET',
          params
        ).then(
          response => {
            console.log("this response", response);
            this.steps = response;
            console.log("this.steps.length ", this.steps.length)
            this.activeStepIndex = this.steps.length - 1;
          }
        )
      },

      callCustomerPhone() {
        wx.makePhoneCall({
          phoneNumber: '13817409664'
        })
      },

      getOrderDetail(params) {
        request(
          GET_ORDER_DETAIL,
          'GET',
          params
        ).then(
          response => {
            console.log("this response", response);
            this.orderInfo = response;
            this.orderProductDetailList = this.orderInfo.orderProductDetailList;
          let status = this.orderInfo.orderStatus;
          let pages = getCurrentPages();
          let prePage = pages[pages.length - 2];
          if (prePage.route === 'pages/ordersubmit/main' && status === 1) {
            this.orderPay();
          }
          }
        )
      }
    },
    computed: {
      deliverDesc() {
        if (this.orderInfo.orderStatus === 4) {
          return "由骑手：" + this.orderInfo.deliverName + "为您配送" + "联系电话：" + this.orderInfo.deliverPhone;
        } else {
          return "正在为你安排配送小哥";
        }

      }
    },
    onShow() {
      let params = this.$root.$mp.query;
      console.log("order detail: ", this.$root.$mp.query);
      this.getOrderDetail(params);
      this.orderNo = this.$root.$mp.query.orderNo;
    },
    onUnload() {
      let pages = getCurrentPages();
      console.log("pageUrl", pages);
      let prePage = pages[pages.length - 2];
      if (prePage.route === 'pages/ordersubmit/main') {
        wx.switchTab({
          url: '/pages/cart/main'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

  .order-item-detail {
    background-color: white;
  }
  .order-freeitem-detail {
    font-size: 12px;
    padding: 0 10px;
  }
  .order-coupon-detail {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 10px 16px 10px 0px;
    border-bottom: 1px solid #f2f2f2;
    margin-left: 16px;
  }

  .order-submit-button {
    position: fixed;
    display: flex;
    justify-content: center;
    width: 100%;
    z-index: 100;
    bottom: 10px;
    background-color: white;
  }
  .order-order-info {
    padding-bottom: 100px;
  }
  .merchant-contact-info {
    display: flex;
    justify-content: center;
  }
  .coupon-img {
    height: 14px;
    width: 14px;
    padding-right: 10px;
  }

</style>

<style lang="scss">


</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
  .custom-button {
    width: 300px;
  }

  .order-need-info_value_class {
    color: #ff4444 !important;
  }

</style>
