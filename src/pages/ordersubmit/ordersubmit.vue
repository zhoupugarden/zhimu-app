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
            <van-button custom-class="btn-padding" @click="openMerchantLocation"
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
        <van-cell title="日期" :value="formatDate" custom-class="custome-cell-time" is-link arrow-direction="down" @click="datePop"/>
      </div>
      <div style="width: 50%">
        <van-cell title="时间" :value="currentTime" custom-class="custome-cell-time" is-link arrow-direction="down" @click="timePop"/>
      </div>
    </div>
    <div style="display: flex; align-items: center;">
    <div style="font-weight: bolder;font-size: 14px;padding: 10px 15px;">
      优惠券
    </div>

    <div v-show="isVip !== 1" @click="navigateToBuyVip">
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
                 custom-style="height:80%"
                 @close="closeCouponPopup"
                 position="bottom">

        <div style="position: relative;">
          <div style="padding-bottom: 10px; position: relative; height: 100%">
            <div style="padding-bottom: 50px;">
              <div v-for="(item , index) in couponCanUseList" :key="index" @click="chooseCouponItem(item)" style="margin: 10px">
                <coupon-itemc :couponInfo="item" @preCheckCoupon="preCheckCoupon"></coupon-itemc>
              </div>
            </div>

            <div style="background-color: white; width: 100%; position: fixed; bottom: 0; border-top: 1px solid #F4F4F4">
              <div style="padding-top: 10px;text-align: center;">
                <van-button type= "primary" @click = "noUseCoupon" custom-class="custom-button">不使用优惠券</van-button>
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
  </div>
</template>

<script>
  const ZERO_AMOUNT = 0;

  import CouponItem from '@/components/CouponItem';
  import CouponItemc from '@/components/CouponItemc';
  import ProductItem from '@/components/ProductItem';
  import {toast} from '../../utils/toast';
  import { mapGetters, mapActions, mapState } from 'vuex';
  import {GET_COUPON_BY_USER_ID, MOCK_WX_PAY, ORDER_PRESUBMIT, GET_USER_ADDRESS, MY_USER_INFO,ORDER_SUBMIT, PRE_USE_COUPON} from '@/utils/api';
  import {request} from "@/utils/request";
  import {formatYMD} from "@/utils/dateUtil";


  export default {
    components: {
      CouponItem, ProductItem, CouponItemc
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
        couponValue: ZERO_AMOUNT.toFixed(2),
        balanceAmount:0.00,
        distance:null,
        deliverValue:ZERO_AMOUNT.toFixed(2),
        tmpDeliverValue:0.00,
        productItems:[],
        productCount:0,
        productAmount:0.00,
        promoteItemList:[]
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
        var url = "../myaddress/main";
        console.log("url",url)
        wx.navigateTo({
          url
        });
      },
      navigateToOrderDetail(orderNo) {
        var url = "../orderdetail/main?orderNo=" + orderNo;
        console.log("url",url)
        wx.navigateTo({
          url
        });
      },
      navigateToBuyVip() {
        var url = "../buyvip/main";
        console.log("url",url)
        wx.navigateTo({
          url
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
        console.log("val", event)
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
        console.log("couponItem: ", item);
        let params = {};
        params.couponCode = item.couponCode;
        params.totalAmount = this.cartTotalPrice;
        params.productItems = this.convertCartList(this.cartList);
        this.preCheckCoupon(params);
      },

      cancelTimePop() {
        this.timePopShow = false;
      },
      confirmTimePop(event) {
        console.log("event", event)
        const {detail, currentTarget} = event.mp;
        this.currentTime = detail.value;
        console.log("currentTime", this.currentTime);
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
          productItem.productName = item.productName;
          productItems.push(productItem)
        }
      return productItems;
      },

      preCheckCoupon(data) {
        let that = this;
        console.log("preCheckCoupon ======");
        request(
          PRE_USE_COUPON,
          'POST',
          data
        ).then(
          response => {
            this.items = response;
            console.log("this response", response);
            if (!response.isApply) {
              toast(response.notApplyReason);
            } else {
              that.couponPopShow = false;
              that.couponValue = response.couponAmount.toFixed(2);
              that.choosedCoupon = that.couponCanUseList.find(item => item.couponCode === response.couponCode);
            }
          }
        )
      },
      validParams() {
        let result = false;
        console.log("this.switchValue , this.addressId", this.switchValue, this.addressId)
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
          console.log("openWxLocation===");
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
            console.log("orderPresubmit response", response);
            this.couponCanUseList = response.presubmitUser.couponList;
            this.balanceAmount = response.presubmitUser.balanceAmount;
            this.distance = response.presubmitUser.currentDistance;
            this.addressArray = response.presubmitUser.addressList;
            this.tmpDeliverValue = response.presubmitOrder.deliverFee;
            console.log("tmpDeliverValue======", this.tmpDeliverValue);
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
            this.productCount = response.presubmitOrder.productCount;
            this.useBalanceAmount = response.presubmitOrder.useBalanceAmount;
            this.promoteItemList = response.presubmitOrder.promoteItemList;
            this.totalProductPrice = response.presubmitOrder.productAmount.toFixed(2);
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

      orderSubmit() {
        if (!this.validParams()) {
          return;
        }
        let params = {};
        params.addressId = this.addressId;
        params.deliverDate = this.formatDate;
        params.deliverTime = this.currentTime;

        if (this.restWxPayAmount === 0) {
          params.payType = 2;
        }else if (this.useBalanceAmount === 0) {
          params.payType = 1;
        }else {
          params.payType = 3;
        }
          params.deliverType = this.deliverType;
        params.orderType = 1;
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
              toast("订单支付成功", 2000);
              this.navigateToOrderDetail(orderNo);
            } else {
              this.navigateToOrderDetail(orderNo);
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
           'currentLocation', 'isVip','cartList','freeCartList', 'cartTotalCount','cartTotalPrice','cartProductListName','merchantInfo'
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
          console.log("this.addressId:", this.addressArray.filter(item => item.id === Number(this.addressId)))
          return this.addressArray.find(item => item.id === Number(this.addressId));
        }
      },

      useBalanceAmount() {
        console.log("balanceMount, cartTotalPrice", this.balanceAmount , this.totalProductPrice)
        if (this.balanceAmount >= this.totalProductPrice) {
          return (this.totalProductPrice - this.couponValue).toFixed(2);
        } else {
          return this.balanceAmount.toFixed(2);
        }
      },

      restWxPayAmount() {
        let needPayAmount = this.totalProductPrice + this.deliverValue - this.couponValue;
        console.log("needPayAmount: this.useBalanceAmount", needPayAmount, this.useBalanceAmount);
        if (needPayAmount > this.balanceAmount) {
          return (needPayAmount - this.balanceAmount).toFixed(2);
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
          console.log("switch:", this.switchValue)
          return 'switch-style'
        }else {
          return 'un-switch-style'

        }
      },
      chooseCouponTip() {
        if (this.choosedCoupon != null) {
          if (this.choosedCoupon.couponType === 1) {
            return this.choosedCoupon.disAmount + "元优惠券";
          }
          if (this.choosedCoupon.couponType === 2) {
            return this.choosedCoupon.disCount + "折优惠券";
          }
          if (this.choosedCoupon.couponType === 3) {
            return "免邮券";
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
          console.log("switchValue: ", val);
          if (val === 1) {
            this.deliverValue = this.tmpDeliverValue.toFixed(2);
            this.deliverType = 1;
          } else {
            this.deliverValue = ZERO_AMOUNT.toFixed(2);
            this.deliverType = 99;
          }

        },
        deep:true,
        immediate: true

      }

    },
    onShow() {
        //要把原有已选的值清空
        let params = this.$root.$mp.query;
        console.log(this.$root.$mp.query);
        //有两种路径，1 从购物车页面进来，2重新选择地址后返回
        if (null != params.addressId) {
          this.addressId = params.addressId;
        }
      //  还原配送方式
      this.switchValue = 1;
      this.deliverType = 1;
      this.orderPreSubmit();
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
