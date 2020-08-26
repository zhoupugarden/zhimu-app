<template>
  <div class="order-detail-container">

    <van-tabs color="#000000" :active="active" @change="onChange">
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
            <van-cell title="期望时间" :value="orderExpectDeliverTime" />
            <van-cell v-if=" orderInfo.deliverType === 1 " title="配送地址" :value="orderInfo.expectDeliverAddress" />
            <van-cell v-else title="商家地址" :value="orderInfo.expectDeliverAddress" />
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
                      color="#000000"
                      type="primary"
          >立即支付</van-button>
        </div>

          <div v-if="orderInfo.orderStatus === 2" class="order-submit-button">
            <van-button custom-class="custom-button"
                        @click="addNoticeMessage"
                        color="#000000"
                        type="primary"
            >立即订阅</van-button>
          </div>

        </div>
      </van-tab>
      <van-tab title="订单状态">
        <van-steps
          active-color="#e64340"
          :steps="steps"
          :active="activeStepIndex"
          direction="vertical"
        />
      </van-tab>
    </van-tabs>
    <van-dialog id="van-dialog" />
    <van-toast  id="van-toast"/>
  </div>
</template>

<script>

  import ProductItem from '@/components/ProductItem';
  import {GET_ORDER_DETAIL,PRODUCT_NOTICE, GET_ORDER_LOG, PAY_ORDER, MOCK_WX_PAY} from '@/utils/api';
  import {request} from "@/utils/request";
  import Dialog from '../../../static/vant/dialog/dialog';
  import {subscribeMessage} from '@/utils/wxApi';
  import {toast} from '../../utils/toast';
  import {pageUrlEnum, orderStatusEnum, deliverTypeEnum} from '@/utils/enums'


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

      //先临时测试放在这里， 订阅消息只能在点击动作或真实支付回调后才能弹出，
      addNoticeMessage() {
        let that = this;
        // 配送通知
        let id = 'By9NVDZM5spRmqLOVnHtBG1CooMzmh3g0ds48Oic4W0';
        // 评论通知
        let id2 = 'NiwQZaKrzNmkRIpsgDpHNX_T0_16WD3bn9N5etwFAmA';
        let tmplIds = [];
        tmplIds.push(id);
        tmplIds.push(id2);
        subscribeMessage(tmplIds,  (res)=> {
          //  添加后台通知
          if (res[id] === 'accept') {
            //配送通知
            that.addNotice(2);
          }
          if (res[id2] === 'accept') {
          //  评论提醒通知
            that.addNotice(3);
          }
        });
      },

      addNotice(noticeType) {
        let params = {};
        params.orderNo = this.orderNo;
        params.noticeType = noticeType;
        request(
          PRODUCT_NOTICE,
          'POST',
          params
        ).then(
          (response) => {
            if (response.isRepeated === 1) {
              toast("您已订阅, 请勿重复订阅", 3000)
            } else {
              toast("消息提醒订阅成功");
            }
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
            this.steps = response;
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
            this.orderInfo = response;
            this.orderProductDetailList = this.orderInfo.orderProductDetailList;
          }
        )
      }
    },
    computed: {
      orderExpectDeliverTime() {
        if (this.orderInfo.expectDeliverTime) {
          return this.orderInfo.expectDeliverDate + '  ' + this.orderInfo.expectDeliverTime;
        }else {
          return this.orderInfo.expectDeliverDate + '  ' + '全天';
        }
      },



      deliverDesc() {
        if (this.orderInfo.deliverType === deliverTypeEnum.self_deliver.value) {
          return "自提";
        } else {
          return "商家配送";
        }

      }
    },
    onShow() {
      let params = this.$root.$mp.query;
      this.getOrderDetail(params);
      this.orderNo = this.$root.$mp.query.orderNo;
    },
    onUnload() {
      let pages = getCurrentPages();
      let prePage = pages[pages.length - 2];
      if ('/' + prePage.route === pageUrlEnum.order_submit_url) {
        wx.switchTab({
          url: pageUrlEnum.home_url,
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "orderdetail.scss";
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
