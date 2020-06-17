<template>
  <div class="ordersubmit-container">
    <div class="order-submit-switch" @click="switchOther">
      <div :class="orderSubmitSwitchDeliver">
        配送
      </div>
      <div :class="orderSubmitSwitchSelf">
        自提
      </div>
    </div>
    <div class="order-submit-address">
      <div v-if="switchValue === 1" class="order-submit-address__deliver" @click="navigateToChooseAddress">
        <div class="order-submit-address__deliver-info">
          <div v-if="addressArray.length === 0" style="padding: 10px 15px; font-size: 14px;">
            点击添加地址
          </div>
          <div v-else>
            <div style="font-size: 13px;padding: 10px 15px;">
              <van-icon name="phone-o"></van-icon>
              {{currentAddress.receiverName}} {{currentAddress.receiverPhone}}
            </div>
            <div style="font-size: 13px;padding: 10px 15px;">
              <van-icon name="location-o"></van-icon>
              {{currentAddress.addressName}} {{currentAddress.roadDetail}}
            </div>
          </div>
        </div>
        <div style="padding-right: 10px;">
          <van-icon name="arrow"></van-icon>
        </div>
      </div>
      <div v-else class="order-submit-address__self">
        <div>
          <van-icon name="wap-home-o" />
        </div>
        <div style="padding: 0px 20px; font-size: 13px;">{{merchantInfo.merchantAddress}}</div>
        <div>
          <div>
            <van-button round color="#000000" custom-class="btn-padding" @click="openMerchantLocation"
                        icon="location-o" type="primary" size="mini">查看位置</van-button>
          </div>
          <div v-show="distance" style="font-size: 13px;">
            距您{{distance}}km
          </div>
        </div>
      </div>

    </div>
    <div v-if="switchValue === 1" style="font-weight: bolder;font-size: 14px;padding: 10px 15px;">配送时间</div>
    <div v-else style="font-weight: bolder;font-size: 14px;padding: 10px 15px;">
      自提时间
    </div>
    <div class="order-submit-time">
      <div style="width: 50%">
        <van-cell title-width="40px;" title="日期" :value="formatDate" custom-class="custome-cell-time" is-link arrow-direction="down" @click="datePop"/>
      </div>
      <div style="width: 50%">
        <van-cell title-width="40px;" title="时间" :value="currentTime" custom-class="custome-cell-time" is-link arrow-direction="down" @click="timePop"/>
      </div>
    </div>
    <div style="display: flex; align-items: center;">
    <div style="font-weight: bolder;font-size: 14px;padding: 10px 15px;">
      优惠券
    </div>

    <div v-show="!isVip" @click="navigateToBuyVip">
      <span class="vip_tip_2">VIP</span>
      <span class="vip_tip">{{vipTip}}</span>
    </div>
    </div>

    <div  class="order-submit-coupon">
      <van-cell :title="chooseCouponTip" custom-class="custome-cell" is-link arrow-direction="down" @click="couponPop"/>
    </div>
    <div style="font-weight: bolder;font-size: 14px;padding: 10px 15px;">
      余额抵扣
    </div>
    <div class="order-submit-balance">
      <van-cell :title=" '' + useBalanceAmount" custom-class="custome-cell"/>
    </div>
    <div class="order-submit-product">
      <van-cell title="商品" :value= "'￥' + totalProductPrice" title-class="product-title-class" value-class="product-value-class"/>
      <van-cell :title="cartProductListName" custom-class="custome-cell" is-link arrow-direction="down" @click="productPop"/>
    </div>
    <div class="order-submit-summary">
        <van-cell-group>
          <van-cell :title="productCount + '件商品'" :value= " flag + totalProductPrice" />
          <van-cell title="余额" :value= " '-' + flag + useBalanceAmount" />
          <van-cell title="优惠券" :value= " '-' + flag + couponValue" />
          <van-cell title="配送费" :value= "flag + deliverValue" />
        </van-cell-group>
    </div>

    <div class="order-submit-button">
      <van-button custom-class="custom-button"
                  color="#000000"
                  @click="orderSubmit"
                  type="primary"
      >{{'微信付款' + flag + restWxPayAmount}}</van-button>
    </div>


    <van-popup :show="timePopShow" position="bottom">
      <van-picker show-toolbar
                  overlay="true"
                  @cancel="cancelTimePop"
                  @confirm="confirmTimePop"
                  :columns="timeColumns" />
    </van-popup>


    <van-popup :show="datePopShow" position="bottom">
      <van-datetime-picker
        type="date"
        date-type="date"
        :value="currentDate"
        @input="onInput"
        @cancel="cancelPopup"
        @confirm="confirmPopup"
        :min-date="minDate"
      />
    </van-popup>

    <van-popup :show="timePopShow" position="bottom">
      <van-picker show-toolbar
                  @cancel="cancelTimePop"
                  @confirm="confirmTimePop"
        :columns="timeColumns" />
    </van-popup>

      <van-popup :show="couponPopShow"
                 custom-style="height:80%; background-color: #f2f2f2;"
                 @close="closeCouponPopup"
                 position="bottom">

        <div style="position: relative;">
          <div style="padding-bottom: 10px; position: relative; height: 100%">
            <div style="padding-bottom: 50px;">
              <div v-for="(item , index) in couponCanUseList" :key="index" @click="chooseCouponItem(item)">
                <coupon-item :couponInfo="item" @preCheckCoupon="preCheckCoupon"></coupon-item>
              </div>
            </div>

            <div style="background-color: white; width: 100%; position: fixed; bottom: 0; border-top: 1px solid #F4F4F4">
              <div style="padding-top: 10px;text-align: center;">
                <van-button color="#000000" type= "primary" @click = "noUseCoupon" custom-class="custom-button">不使用优惠券</van-button>
              </div>
            </div>
          </div>

        </div>

      </van-popup>


    <van-popup :show="productPopShow"
               custom-style="height:80%"
               @close="closeProductPopup"
               position="bottom">
          <div v-for="item in productItems" :key="index">
            <product-item :productItemInfo="item"></product-item>
          </div>
    </van-popup>
    <van-toast  id="van-toast"/>
    <van-dialog id="van-dialog" />

  </div>
</template>

<script>
  const ZERO_AMOUNT = 0;

  import CouponItem from '@/components/CouponItem';
  import ProductItem from '@/components/ProductItem';
  import {toast} from '../../utils/toast';
  import { mapGetters, mapActions, mapState } from 'vuex';
  import {GET_COUPON_BY_USER_ID, PAY_ORDER, MOCK_WX_PAY, ORDER_PRESUBMIT, GET_USER_ADDRESS, MY_USER_INFO,ORDER_SUBMIT, PRE_USE_COUPON} from '@/utils/api';
  import {request} from "@/utils/request";
  import {formatYMD} from "@/utils/dateUtil";
  import Dialog from '../../../static/vant/dialog/dialog';
  import {CouponRuleTypeEnum, pageUrlEnum} from "@/utils/enums";

  export default {
    components: {
      CouponItem, ProductItem
    },
    data() {
      return {
        flag:'￥',
        switchValue: 1,
        deliverType:1,
        addressId:0,
        couponCanUseList:[],
        choosedCoupon: null,
        addressArray: [],
        datePopShow:false,
        timePopShow:false,
        couponPopShow:false,
        productPopShow:false,
        currentDate: new Date().getTime(),
        formatDate: "",
        currentTime: null,
        minDate: new Date().getTime(),
        isOverToday:false,
        timeColumns:[],
        allTimes:[],
        balanceValue:"0",
        userInfo:{},
        vipTip:"",
        totalProductPrice:0.00,
        couponValue: ZERO_AMOUNT,
        balanceAmount:0.00,
        distance:null,
        deliverValue:ZERO_AMOUNT,
        tmpDeliverValue:0.00,
        productItems:[],
        productCount:0,
        productAmount:0.00,
        promoteItemList:[],
        cartProductListName:""
      }
    },
    methods: {
      formatter(type, value) {
        console.log("type vale: ", type, value);
      },
      ...mapActions(
        [
          'checkoutCartList',
          'checkoutFreeCartList'
        ]
      ),
      switchOther() {
        this.switchValue = this.switchValue * -1;
        console.log("this.switchValue:", this.switchValue)
      },
      navigateToChooseAddress() {
        wx.navigateTo({
          url:pageUrlEnum.my_address_url
        });
      },
      navigateToOrderDetail(orderNo) {
        var url = "../orderdetail/main?orderNo=" + orderNo;
        console.log("url",url)
        wx.redirectTo({
          url
        });
      },
      navigateToBuyVip() {
        wx.navigateTo({
          url:pageUrlEnum.buy_vip_url
        });
      },
      datePop() {
        this.datePopShow = true;
      },
      timePop() {
        this.timePopShow = true;
      },
      couponPop() {
        this.couponPopShow = true;
      },
      cancelPopup() {
        this.datePopShow = false;
      },
      closeCouponPopup() {
        this.couponPopShow = false;
      },
      productPop() {
        this.productPopShow = true;
      },
      closeProductPopup() {
        this.productPopShow = false;
      },
      confirmPopup(event) {
        const {detail, currentTarget} = event.mp;
        if (!isNaN(detail)) {
         console.log(formatYMD(detail));
          this.formatDate = formatYMD(detail);
          this.currentDate = detail;
          this.datePopShow = false;
          if (detail > new Date().getTime()) {
            this.isOverToday = false;
            this.timeColumns = this.allTimes;
            this.currentTime = this.timeColumns[0];
          }else {
            this.isOverToday = true;
          }

        }else {
          this.datePopShow = false;
        }
      },
      noUseCoupon() {
        this.couponPopShow = false;
        this.choosedCoupon = null;
        this.couponValue = 0.00;
      },
      chooseCouponItem(item) {
        let params = {};
        params.couponCode = item.couponCode;
        params.productItems = this.convertCartList(this.cartList);
        this.preCheckCoupon(params);
      },

      cancelTimePop() {
        this.timePopShow = false;
      },
      confirmTimePop(event) {
        const {detail, currentTarget} = event.mp;
        this.currentTime = detail.value;
        this.timePopShow = false;
      },
      convertCartList(data) {
        let productItems = [];
        for(let item of data) {
          let productItem = {};
          productItem.categoryId = item.categoryId;
          productItem.productId = item.productId;
          productItem.skuId = item.skuId;
          productItem.quantity = item.quantity;
          productItem.type = item.type;
          productItem.promoteType = item.promoteType;
          productItem.productName = item.productName;
          productItems.push(productItem)
        }
      return productItems;
      },

      preCheckCoupon(data) {
        let that = this;
        request(
          PRE_USE_COUPON,
          'POST',
          data
        ).then(
          response => {
            this.items = response;
            if (!response.isApply) {
              toast(response.notApplyReason);
            } else {
              that.couponPopShow = false;
              that.couponValue = response.couponAmount;
              that.choosedCoupon = that.couponCanUseList.find(item => item.couponCode === response.couponCode);
            }
          }
        )
      },
      validParams() {
        let result = false;
        if (this.switchValue === 1 && this.addressId === 0) {
          wx.showModal({
            title: "提示",
            content: '亲,请先选择收货地址',
            confirmText: '确定',
            showCancel: false,
            success(res) {
              if(res.confirm) {
                console.log("选择收货地址");
              }
            }
          });
        }
        if (this.isOverToday === true) {
          wx.showModal({
            title: "提示",
            content: '亲,商品已过当日可配送时间,请选择其他配送日期',
            confirmText: '确定',
            showCancel: false,
            success(res) {
              if(res.confirm) {
                console.log("选择配送日期");
              }
            }
          });
        }
        else {
          result = true;
        }
        return result;
      },
      openMerchantLocation() {
          let latitude = this.merchantInfo.latitude;
          let longitude = this.merchantInfo.longitude;
          wx.openLocation({
            latitude,
            longitude,
            scale: 18
          })
      },

      orderPreSubmit() {
        let params = {};
        params.deliverType = this.deliverType;
        params.fittingList = this.freeCartList;
        params.productList = this.cartList;
        params.latitude = this.currentLocation.latitude;
        params.longitude = this.currentLocation.longitude;
        request(
          ORDER_PRESUBMIT,
          'POST',
          params

        ).then(
          response => {
            this.couponCanUseList = response.presubmitUser.couponList;
            this.balanceAmount = response.presubmitUser.balanceAmount;
            this.distance = response.presubmitUser.currentDistance;
            this.addressArray = response.presubmitUser.addressList;
            this.tmpDeliverValue = response.presubmitOrder.deliverFee;
            if (this.switchValue === 1) {
              this.deliverValue = this.tmpDeliverValue;
              this.deliverType = 1;
            }
            this.vipTip = response.presubmitOrder.vipTip;
            let strMinDate = response.presubmitTime.minDate;
            this.minDate = new Date(strMinDate).getTime();
            this.isOverToday = response.presubmitTime.isOverToday;
            this.currentTime = response.presubmitTime.currentTime;
            let strCurrentDate = response.presubmitTime.currentDate;
            this.currentDate = new Date(strCurrentDate).getTime();
            this.formatDate = formatYMD(this.currentDate);
            console.log("this.currentDate", this.currentDate);
            this.productItems = response.presubmitProduct.productItems;
            this.cartProductListName = response.presubmitOrder.cartProductListName;
            this.productCount = response.presubmitOrder.productCount;
            this.useBalanceAmount = response.presubmitOrder.useBalanceAmount;
            this.promoteItemList = response.presubmitOrder.promoteItemList;
            this.totalProductPrice = response.presubmitOrder.productAmount;
            this.timeColumns = response.presubmitTime.limitTimes;
            this.allTimes = response.presubmitTime.allTimes;
            if (this.isOverToday === true) {
              wx.showModal({
                title: "提示",
                content: '亲,商品已过当日可配送时间,请选择其他配送日期',
                confirmText: '确定',
                showCancel: false,
                success(res) {
                  if(res.confirm) {
                    console.log("选择配送日期");
                  }
                }
              });
            }
          }
        )
      },

      orderPay(orderNo) {
        let that = this;
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
            //  进入订单详情页面
              that.navigateToOrderDetail(orderNo);
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
            //  微信支付成功后，跳转到订单详情页面
            let orderNo = response.orderNo;
            this.navigateToOrderDetail(orderNo);
          }
        )
      },

      orderSubmit() {
        let that = this;
        if (!this.validParams()) {
          return;
        }
        let params = {};
        params.addressId = this.addressId;
        params.deliverDate = this.formatDate;
        params.deliverTime = this.currentTime;
        params.deliverType = this.deliverType;
        if (this.choosedCoupon != null) {
          params.couponCode = this.choosedCoupon.couponCode;
        }
        params.productItems = this.convertCartList(this.cartList);
        params.freeProductItems = this.freeCartList;
        params.remark = "留言待补充";
        request(
          ORDER_SUBMIT,
          'POST',
          params
        ).then(
          response => {
            console.log("this response", response);
            let orderNo = response.orderNo;
            if (response.orderStatus === 2) {
              //如果订单提交，余额支付的话，则直接余额支付成功，跳转到订单详情页面
              toast("订单支付成功", 2000);
              that.navigateToOrderDetail(orderNo);
            } else {
              //调用后台进行prepay， 然后进行微信支付
              that.orderPay(orderNo);
            }
            this.checkoutCartList();
            this.checkoutFreeCartList();
          }
        )
      }
    },
    computed: {
      ...mapGetters(
        [
           'currentLocation', 'isVip','cartList','freeCartList', 'cartTotalCount','cartTotalPrice','merchantInfo'
        ]
      ),
      ...mapState(
        {
          merchantInfo: state=>state.merchant.merchantInfo,
        }
      ),
      currentAddress() {
        if (this.switchValue === -1) {
          return "";
        }
        if (this.addressArray.length === 0) {
          return "";
        }
        if(this.addressId !== 0 && this.addressArray.length === 0) {
          this.addressId = 0;
        }
        if(this.addressId === 0 && this.addressArray.length > 0) {
          //取最新添加的地址
          let addressItem =  this.addressArray[this.addressArray.length - 1];
          this.addressId = addressItem.id;
          return addressItem;
        }else {
          return this.addressArray.find(item => item.id === Number(this.addressId));
        }
      },

      useBalanceAmount() {
        let totalAmount = this.deliverValue + this.totalProductPrice;
        if (this.balanceAmount >= totalAmount) {
          return totalAmount - this.couponValue;
        } else {
          return this.balanceAmount;
        }
      },

      restWxPayAmount() {
        let needPayAmount = this.totalProductPrice + this.deliverValue - this.couponValue;
        if (needPayAmount > this.balanceAmount) {
          return needPayAmount - this.balanceAmount;
        }else {
          return 0.00;
        }
      },

      orderSubmitSwitchDeliver() {
        if (this.switchValue === 1) {
          console.log("switch:", this.switchValue)
          return 'switch-style'
        }else {
          return 'un-switch-style'
        }
      },
      orderSubmitSwitchSelf() {
        if (this.switchValue === -1) {
          return 'switch-style'
        }else {
          return 'un-switch-style'

        }
      },
      chooseCouponTip() {
        if (this.choosedCoupon != null) {
          switch (this.choosedCoupon.couponType) {
            case CouponRuleTypeEnum.full_reduction:
              return this.choosedCoupon.disAmount + "元优惠券";
            case CouponRuleTypeEnum.dis_count:
              return this.choosedCoupon.disCount + "折优惠券";
            case CouponRuleTypeEnum.free_freight:
              return "免邮券";
            case CouponRuleTypeEnum.off_line:
              return;
            case CouponRuleTypeEnum.redeem:
              return this.choosedCoupon.couponValue;
            case CouponRuleTypeEnum.promote_pound:
              return this.choosedCoupon.couponValue;
            case CouponRuleTypeEnum.one_by_one:
              return this.choosedCoupon.couponValue;
            case CouponRuleTypeEnum.sec_by_half:
              return this.choosedCoupon.couponValue;
            default:
              return;
          }
        } else {
          if (this.couponCanUseList.length > 0) {
            return "未选择：" + this.couponCanUseList.length + "张可用";
          } else {
            return "无可用优惠券";
          }
        }
      }
    },
    watch: {
      'switchValue': {
        handler(val) {
          if (val === 1) {
            this.deliverValue = this.tmpDeliverValue;
            this.deliverType = 1;
          } else {
            this.deliverValue = ZERO_AMOUNT;
            this.deliverType = 99;
          }

        },
        deep:true,
        immediate: true

      }

    },
    onShow() {
      //初始化页面的数据
      this.choosedCoupon = null;
      this.couponPopShow = false;
      this.productPopShow = false;
      this.couponValue = ZERO_AMOUNT;
        //要把原有已选的值清空
        let params = this.$root.$mp.query;
        let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      if (prevPage.route === pageUrlEnum.cart_url) {
        this.orderPreSubmit();
      }
      console.log(this.$root.$mp.query);
        //有三种路径，1 从购物车页面进来，2重新选择地址后返回 3 支付完成后返回
        if (null != params.addressId) {
          this.addressId = params.addressId;
        }
      //  还原配送方式
      this.switchValue = 1;
      this.deliverType = 1;
    }

  }
</script>

<style lang="scss" scoped>
  @import "ordersubmit.scss";
</style>

<style lang="scss">
  .custome-cell {
    background-color: #F4F4F4 !important;
  }
  .custome-cell-time {
    background-color: #F4F4F4 !important;
    font-size: 12px !important;
  }
  .custom-button {
    width: 300px;
  }
  .btn-padding {
    padding: 0px 10px !important;
  }
  .product-title-class {
   font-weight: bolder;
  }
  .product-value-class {
    font-weight: bolder;
  }


</style>

<style lang="wxss">
  page{
    height: 100%;
  }
</style>
