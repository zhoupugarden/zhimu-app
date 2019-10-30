<template>
  <div class="order-detail-container">

    <van-tabs :active="active" @change="onChange">
      <van-tab title="订单详情">
        <div>
        <div v-for="(detail_, index) in orderProductDetailList" :key="index" class="order-item-detail">
          <product-item :productItemInfo="detail_"></product-item>
        </div>
        <div class="order-freeitem-detail">
          <van-cell-group>
          <van-cell title="数字蜡烛" value="1个" />
          <van-cell title="桃心蜡烛" value="1个" />
          <van-cell title="赠送餐具" value="5份" />
          </van-cell-group>
        </div>
        <div class="order-coupon-detail">
          <van-cell title="其他优惠" :value="orderInfo.couponAmount" />
        </div>
        <div class="order-total-info">
          <van-cell title="总计" :value="orderInfo.totalAmount" />
        </div>

        <div class="order-need-info">
          <van-cell title="需付" :value="orderInfo.needPayAmount" />
        </div>

        <div class="merchant-contact-info">
          <van-cell icon="phone-o" title="联系客服">
          </van-cell>
        </div>
        <div>
          配送信息
        </div>
        <div class="order-deliver-info">
          <van-cell-group>
            <van-cell title="期望时间" :value="orderInfo.expectDeliverTime" />
            <van-cell title="配送地址" :value="orderInfo.expectDeliverAddress" />
            <van-cell title="配送服务" :value="deliverDesc" />
          </van-cell-group>
        </div>
        <div>
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
              title: '确认支付'
            }).then(() => {
              that.mockWxPay(data);
            }).catch(() => {
              // on cancel
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
          }
        )
      }
    },
    computed: {
      deliverDesc() {
        return this.orderInfo.deliverName + this.orderInfo.deliverPhone;
      }
    },


    onShow() {
      let params = this.$root.$mp.query;
      console.log("order detail: ", this.$root.$mp.query);
      this.getOrderDetail(params);
      this.orderNo = this.$root.$mp.query.orderNo;
      console.log(this.orderInfo.orderStatus === 1)
    },
    onUnload() {
      let pages = getCurrentPages();
      console.log("pageUrl", pages);
      let prePage = pages[pages.length - 2];
      if (prePage.route == 'pages/ordersubmit/main') {
        wx.reLaunch({
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
</style>
