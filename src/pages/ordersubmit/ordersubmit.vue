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
      <div v-if="defaultParams.switchValue === 1" class="order-submit-address__deliver" @click="navigateToChooseAddress">
        <div class="order-submit-address__deliver-info">
          <div v-if="!currentAddress.id" style="padding: 10px 15px; font-size: 14px;">
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
          <van-cell title="优惠券" :value= " '-' + flag + choosedCoupon.couponValue" />
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


    <van-popup :show="popShowParams.timePopShow" position="bottom">
      <van-picker show-toolbar
                  overlay="true"
                  @cancel="cancelTimePop"
                  @confirm="confirmTimePop"
                  :columns="timeColumns" />
    </van-popup>


    <van-popup :show="popShowParams.datePopShow" position="bottom">
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

    <van-popup :show="popShowParams.timePopShow" position="bottom">
      <van-picker show-toolbar
                  @cancel="cancelTimePop"
                  @confirm="confirmTimePop"
        :columns="timeColumns" />
    </van-popup>

      <van-popup :show="popShowParams.couponPopShow"
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


    <van-popup :show="popShowParams.productPopShow"
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
  import {GET_COUPON_BY_USER_ID, PAY_ORDER, MOCK_WX_PAY, ORDER_PRESUBMIT, GET_ADDRESS_BY_ID, MY_USER_INFO,ORDER_SUBMIT, PRE_USE_COUPON} from '@/utils/api';
  import {request} from "@/utils/request";
  import {formatYMD} from "@/utils/dateUtil";
  import Dialog from '../../../static/vant/dialog/dialog';
  import {CouponRuleTypeEnum, pageUrlEnum} from "@/utils/enums";

  const defaultParamsValue = {
    switchValue: 1,
    deliverType:1,
  };

  const defaultPopShowParams = {
    datePopShow:false,
    timePopShow:false,
    couponPopShow:false,
    productPopShow:false
  };

  const defaultAddress = {
    id : null,
    receiverName:"",
    receiverPhone:"",
    addressName:"",
    roadDetail:""
  };

  const defaultChooseCoupon = {
    couponCode:"",
    couponValue:0,
    couponType:null,
    couponName:"",
    couponLimit:"",
    disAmount:null,
    minAmount:null,
    disCount:null,
    maxAmount:null
  };


  const presubmitResponse = {
    presubmitUser:null,
    presubmitTime:null,
    presubmitOrder:null,
    presubmitProduct:null
  };



  export default {
    components: {
      CouponItem, ProductItem
    },
    data() {
      return {
        flag : '￥',
        defaultParams: Object.assign({}, defaultParamsValue),
        couponCanUseList:[],
        addressArray: [],
        choosedCoupon: Object.assign({}, defaultChooseCoupon),
        popShowParams: Object.assign({}, defaultPopShowParams),
        currentDate: new Date().getTime(),
        formatDate: "",
        currentTime: null,
        minDate: new Date().getTime(),
        isOverToday:false,
        timeColumns:[],
        allTimes:[],
        balanceValue:"0",
        vipTip:"",
        totalProductPrice:0.00,
        balanceAmount:0.00,
        distance:null,
        deliverValue:ZERO_AMOUNT,
        tmpDeliverValue:0.00,
        productItems:[],
        productCount:0,
        productAmount:0.00,
        promoteItemList:[],
        cartProductListName:"",
        currentAddress: Object.assign({}, defaultAddress)
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
        this.defaultParams.switchValue = this.defaultParams.switchValue * -1;

        if (this.defaultParams.switchValue > 0) {
          this.defaultParams.deliverType = 1;
        } else {
          this.defaultParams.deliverType = 99;
        }

      },
      navigateToChooseAddress() {
        wx.navigateTo({
          url:pageUrlEnum.my_address_url
        });
      },
      navigateToOrderDetail(orderNo) {

        var url = pageUrlEnum.order_detail_url + "?orderNo=" + orderNo;
        wx.redirectTo({
          url
        });
      },
      navigateToBuyVip() {
        wx.navigateTo({
          url:pageUrlEnum.star_vip_url
        });
      },

      datePop() {
        this.popShowParams.datePopShow = true;
      },
      timePop() {
        this.popShowParams.timePopShow = true;
      },
      couponPop() {
        this.popShowParams.couponPopShow = true;
      },
      cancelPopup() {
        this.popShowParams.datePopShow = false;
      },
      closeCouponPopup() {
        this.popShowParams.couponPopShow = false;
      },
      productPop() {
        this.popShowParams.productPopShow = true;
      },
      closeProductPopup() {
        this.popShowParams.productPopShow = false;
      },
      confirmPopup(event) {
        const {detail, currentTarget} = event.mp;
        if (!isNaN(detail)) {
         console.log(formatYMD(detail));
          this.formatDate = formatYMD(detail);
          this.currentDate = detail;
          this.popShowParams.datePopShow = false;
          if (detail > new Date().getTime()) {
            this.isOverToday = false;
            this.timeColumns = this.allTimes;
            this.currentTime = this.timeColumns[0];
          }else {
            this.isOverToday = true;
          }

        }else {
          this.popShowParams.datePopShow = false;
        }
      },
      noUseCoupon() {
        this.popShowParams.couponPopShow = false;
        this.choosedCoupon = Object.assign({}, defaultChooseCoupon);
      },
      chooseCouponItem(item) {
        let params = {};
        params.couponCode = item.couponCode;
        params.productItems = this.convertCartList(this.cartList);
        this.preCheckCoupon(params);
      },

      cancelTimePop() {
        this.popShowParams.timePopShow = false;
      },
      confirmTimePop(event) {
        const {detail, currentTarget} = event.mp;
        this.currentTime = detail.value;
        this.popShowParams.timePopShow = false;
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
              that.popShowParams.couponPopShow = false;
              that.choosedCoupon = that.couponCanUseList.find(item => item.couponCode === response.couponCode);
              that.choosedCoupon.couponValue = response.couponAmount;
            }
          }
        )
      },

      listUserAddress(addressId) {
        let params = {};
        params.addressId = addressId;
        request(
          GET_ADDRESS_BY_ID,
          'GET',
          params
        ).then(
          response => {
            this.currentAddress = response;
          }
        )
      },

      validParams() {
        let result = false;
        //选择的配送，但还没填写配送地址
        if (this.defaultParams.switchValue === 1 && !this.currentAddress.id) {
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
          return result;
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
          return result;
        }
        else {
          result = true;
          return result;
        }
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
        params.deliverType = this.defaultParams.deliverType;
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

            console.log("this.couponCanUseList", this.couponCanUseList);


            this.balanceAmount = response.presubmitUser.balanceAmount;
            this.distance = response.presubmitUser.currentDistance;
            this.addressArray = response.presubmitUser.addressList;

            //用户如果有配置过地址， 初始化使用默认的地址
            if (this.addressArray.length > 0) {
              console.log("debug 先后顺序");
              this.currentAddress = this.addressArray.find(item => item.isDefault);
            }

            this.tmpDeliverValue = response.presubmitOrder.deliverFee;
            if (this.defaultParams.switchValue === 1) {
              this.deliverValue = this.tmpDeliverValue;
              this.defaultParams.deliverType = 1;
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
        params.addressId = this.currentAddress.id;
        params.deliverDate = this.formatDate;
        params.deliverTime = this.currentTime;
        params.deliverType = this.defaultParams.deliverType;
        if (this.choosedCoupon.couponCode != null) {
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
           'currentLocation', 'isVip','cartList','freeCartList','merchantInfo'
        ]
      ),
      ...mapState(
        {
          merchantInfo: state=>state.merchant.merchantInfo,
        }
      ),

      useBalanceAmount() {
        let totalAmount = this.deliverValue + this.totalProductPrice;
        if (this.balanceAmount >= totalAmount) {
          return totalAmount - this.choosedCoupon.couponValue;
        } else {
          return this.balanceAmount;
        }
      },

      restWxPayAmount() {
        let needPayAmount = this.totalProductPrice + this.deliverValue - this.choosedCoupon.couponValue;

        if (needPayAmount > this.balanceAmount) {
          return (needPayAmount - this.balanceAmount).toFixed(2);
        }else {
          return 0.00;
        }
      },


      orderSubmitSwitchDeliver() {
        if (this.defaultParams.switchValue === 1) {
          return 'switch-style'
        }else {
          return 'un-switch-style'
        }
      },
      orderSubmitSwitchSelf() {
        if (this.defaultParams.switchValue === -1) {
          return 'switch-style'
        }else {
          return 'un-switch-style'

        }
      },
      chooseCouponTip() {
        if (this.choosedCoupon.couponCode) {
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
    onShow() {
        //要把原有已选的值清空
      console.log("this.$root.$mp.query", this.$root.$mp.query);
        let params = this.$root.$mp.query;
        let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      //如果是从购物车跳转过来的，进行订单预提交(路由中保存的是相对地址， 需要加上'/')
      if ('/' + prevPage.route === pageUrlEnum.cart_url) {
        this.orderPreSubmit();
      }
        //有两种种路径，1 从购物车页面进来，2重新选择地址后返回
        if (null != params.addressId) {
          //获取用户地址
          this.listUserAddress(params.addressId);
          console.log("this.currentAddress", this.currentAddress);
        }
    },
    onUnload() {
      //还原数据
      this.popShowParams = Object.assign({}, defaultPopShowParams);
      this.choosedCoupon = Object.assign({}, defaultChooseCoupon);
      this.currentAddress = Object.assign({}, defaultAddress);
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
