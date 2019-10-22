<template>
  <div class="order-detail-container">


    <van-tabs :active="active" @change="onChange">
      <van-tab title="订单详情">
        <div v-for="(detail, index) in orderProductDetailList" :key="index" class="order-item-detail">
          <product-item :productItemInfo="detail"></product-item>
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

        <div class="order-submit-button">
          <van-button custom-class="custom-button"
                      @click="orderPay"
                      type="primary"
          >立即支付</van-button>
        </div>

      </van-tab>
      <van-tab title="订单状态">
        <van-steps
          :steps="steps"
          :active="stepActive"
          direction="vertical"
          active-color="#f44"
        />
      </van-tab>

    </van-tabs>

  </div>
</template>

<script>

  import ProductItem from '@/components/ProductItem';
  import {GET_ORDER_DETAIL, GET_ORDER_LOG} from '@/utils/api';
  import {request} from "@/utils/request";

  export default {
    components: {
      ProductItem
    },

    data() {
      return {
        active:0,
        stepActive:1,
        orderInfo: {},
        orderProductDetailList: {},
        steps: [
          {
            text: '订单已提交 2019-10-10 10:19:18',
            desc: '蛋糕制作中请耐心等待'
          },
          {
            text: '步骤二',
            desc: '描述信息'
          },
          {
            text: '步骤三',
            desc: '描述信息'
          },
          {
            text: '订单已配送',
            desc: '配送小哥(蜂鸟配送-13918237123)已出发,请确保电话畅通'
          }
        ]

      }
    },
    methods: {
      onChange(event) {
        console.log("event:", event);
      },
      orderPay() {
      },


      getOrderLog(params) {
        request(
          GET_ORDER_LOG,
          'GET',
          params
        ).then(
          response => {
            console.log("this response", response);
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
      console.log(this.$root.$mp.query);
      this.getOrderDetail(params);
      this.getOrderLog(params);
    }

  }
</script>

<style lang="scss" scoped>
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
