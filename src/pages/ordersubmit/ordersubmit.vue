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
            <div style="font-size: 14px;padding: 10px 15px;">
              <van-icon name="phone-o"></van-icon>
              {{currentAddress.receiverName}} {{currentAddress.receiverPhone}}
            </div>
            <div style="font-size: 14px;padding: 10px 15px;">
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
        {{selfAddress}}
      </div>

    </div>
    <div style="font-weight: bolder;font-size: 14px;padding: 10px 15px;">配送时间</div>
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

    <div @click="navigateToBuyVip">
      <span class="vip_tip_2">VIP</span>
      <span class="vip_tip">{{vipTip}}</span>
    </div>
    </div>

    <div class="order-submit-coupon">
      <van-cell :title="chooseCouponTip" custom-class="custome-cell" is-link arrow-direction="down" @click="couponPop"/>
    </div>
    <div style="font-weight: bolder;font-size: 14px;padding: 10px 15px;">
      余额
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
          <van-cell :title="cartTotalCount + '件商品'" :value= " flag + totalProductPrice" />
          <van-cell title="余额" :value= " '-' + flag + useBalanceAmount" />
          <van-cell title="优惠券" :value= " '-' + flag + couponValue" />
          <van-cell title="配送费" :value= "flag + deliverValue" />
        </van-cell-group>
    </div>

    <div class="order-submit-button">
      <van-button custom-class="custom-button"
                  @click="orderSubmit"
                  type="primary"
      >微信付款{{flag + restWxPayAmount}}</van-button>
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
                 @enter="enterCouponPop"
                 @close="closeCouponPopup"
                 position="bottom">

        <div style="position: relative; height: 100%">
          <div style="padding-bottom: 10px; position: relative; height: 100%">
            <div style="padding-bottom: 50px;">
              <div v-for="(item , index) in couponCanUseList" :key="index" @click="chooseCouponItem(item)" style="margin: 10px">
                <coupon-itemc :couponInfo="item" @preCheckCoupon="preCheckCoupon"></coupon-itemc>
              </div>
            </div>

            <div style="background-color: white; width: 100%; position: absolute; bottom: 0; border-top: 1px solid #F4F4F4">
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
          <div v-for="item in cartList" :key="index">
            <product-item :productItemInfo="item"></product-item>
          </div>
    </van-popup>
    <van-toast  id="van-toast"/>
  </div>
</template>

<script>
  import CouponItem from '@/components/CouponItem';
  import CouponItemc from '@/components/CouponItemc';
  import ProductItem from '@/components/ProductItem';
  import {toast} from '../../utils/toast';
  import {  mapActions } from 'vuex';
  import { mapGetters } from 'vuex';
  import {GET_COUPON_BY_USER_ID, MOCK_WX_PAY, GET_USER_ADDRESS, MY_USER_INFO,ORDER_SUBMIT, PRE_USE_COUPON} from '@/utils/api';
  import {request} from "@/utils/request";
  import {formatYMD} from "@/utils/dateUtil";

  const timeColumnArray = ['10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00',
    '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00'];
  export default {
    components: {
      CouponItem, ProductItem, CouponItemc
    },
    data() {
      return {
        flag:'￥',
        switchValue: 1,
        addressId:0,
        balanceCount:3,
        firstProduct:"测试商品",
        couponCanUseList:[],
        chosedCoupon: null,
        addressArray: [],
        selfAddress:"周浦镇年家浜东路129弄",
        datePopShow:false,
        timePopShow:false,
        couponPopShow:false,
        productPopShow:false,
        currentDate: new Date().getTime(),
        formatDate: "",
        currentTime: null,
        minDate: new Date().getTime(),
        balanceValue:"0",
        userInfo:{},
        vipTip:"",

        totalProductPrice:0,
        couponValue: 0,
        balanceAmount:0,
        // useBalanceAmount:0,
        // restWxPayAmount:0,
        deliverValue:0
      }
    },
    methods: {

      formatter(type, value) {
        console.log("type vale: ", type, value);
        // if (type === 'year') {
        //   return `${value}年`;
        // } else if (type === 'month') {
        //   return `${value}月`;
        // } else {
        //   return `${value}日`;
        // }
        // return value;
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

      enterCouponPop() {
        console.log("====enterCouponPop=====");
        this.getCoupon();
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
            this.currentTime = "10:00-11:00";
          }

        }else {
          this.datePopShow = false;
        }
      },
      noUseCoupon() {
        this.couponPopShow = false;
      },
      chooseCouponItem(item) {
        console.log("couponItem: ", item);
        let params = {};
        params.userId = this.userId;
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
      listUserAddress() {
        let params = {};
        params.userId = this.userId;
        request(
          GET_USER_ADDRESS,
          'GET',
          params
        ).then(
          response => {
            this.addressArray = response;
            console.log("this response====", response);
          }
        )
      },
      getUserInfo() {
        let params = {};
        params.token = this.token;
        request(
          MY_USER_INFO,
          'GET',
          params
        ).then(
          response => {
            this.userInfo = response;
            this.balanceAmount = this.userInfo.balanceAmount;
            console.log("this response", response);
          }
        )
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
              that.couponValue = response.couponAmount;
              that.chosedCoupon = that.couponCanUseList.find(item => item.couponCode === response.couponCode);
            }
          }
        )
      },

      getCoupon() {
        let params = {};
        params.userId = this.userId;
        request(
          GET_COUPON_BY_USER_ID,
          'GET',
          params

        ).then(
          response => {
            let couponList = response;
            console.log("this response", response);
            this.couponCanUseList = couponList.filter(
              item => {
                return item.status === 1;
              }
            );
          }
        )
      },
      validParams() {
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
          return false;
        } else {
          return true;
        }
      },

      calcTotalPrice() {
        this.totalCartList = this.cartList;
        if (this.totalCartList.length === 0) {
          this.totalPrice = 0.00;
        } else {
          console.log("cartTotalPrice ");
          console.log("totalCartList ", this.totalCartList);
          let tmpTotalPrice = 0;
          for (let index in this.totalCartList) {
            console.log("item", this.totalCartList[index]);
            let item = this.totalCartList[index];
            let itemPrice = item.salePrice * item.quantity;
            console.log("itemPrice", itemPrice);
            tmpTotalPrice = tmpTotalPrice + itemPrice;
          }
          this.totalProductPrice = tmpTotalPrice.toFixed(2);
          console.log("this.totalPrice", this.totalPrice)
        }
      },



      orderSubmit() {
        if (!this.validParams()) {
          return;
        }
        let params = {};
        params.userId = this.userId;
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
        if (this.switchValue === 1) {
          params.deliverType = 1;
        }else {
          params.deliverType = 99;
        }
        params.orderType = 1;
        if (this.chosedCoupon != null) {
          params.couponCode = this.chosedCoupon.couponCode;
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

      timeColumns() {
        const timeColumnArray = ['10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00',
          '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00'];
        if (this.currentDate > new Date().getTime()) {
          return timeColumnArray;
        } else {
          let hour = new Date().getHours();

          if ((hour - 10) > 0) {
            return timeColumnArray.slice(hour - 10, timeColumnArray.length);
          }else {
            return timeColumnArray;
          }

        }

      },

      ...mapGetters(
        [
           'cartList','freeCartList', 'cartTotalCount','cartTotalPrice','cartProductListName','token','userId'
        ]
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
          return this.totalProductPrice - this.couponValue;
        } else {
          return this.balanceAmount;
        }
      },

      restWxPayAmount() {
        let needPayAmount = this.totalProductPrice + this.deliverValue - this.couponValue;
        console.log("needPayAmount: this.useBalanceAmount", needPayAmount, this.useBalanceAmount)
        if (needPayAmount > this.balanceAmount) {
          return (needPayAmount - this.balanceAmount).toFixed(2);
        }else {
          return 0;
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
        if (this.chosedCoupon != null) {
          if (this.chosedCoupon.couponType === 1) {
            return this.chosedCoupon.disAmount + "元优惠券";
          }
          if (this.chosedCoupon.couponType === 2) {
            return this.chosedCoupon.disCount + "折优惠券";
          }
          if (this.chosedCoupon.couponType === 3) {
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

    onLoad() {
      this.currentDate = new Date().getTime();
      this.formatDate = formatYMD(this.currentDate);
      this.currentTime = "10:00-11:00";
      let nowDate = new Date();
      let hour = nowDate.getHours();
      if ((hour - 10) > 10) {
        this.currentTime = "当日停接单";
      } else {
        this.currentTime = timeColumnArray[Math.abs(hour - 10)];
      }

    },
    onShow() {
      this.calcTotalPrice();

      if (this.totalProductPrice < 30) {
        this.deliverValue = 8;
        this.vipTip = "加入会员可得免邮卡本次省8元";
      } else if (this.totalProductPrice >=30 && this.totalProductPrice < 80) {
        this.vipTip = "加入会员可得免邮卡本次省8元";
        this.deliverValue = 5;
      } else if (this.totalProductPrice >=80 && this.totalProductPrice < 100) {
        this.vipTip = "加入会员可得5张9折卡本次省" + (this.totalProductPrice * 0.1).toFixed(2) + "元";
        this.deliverValue = 5;
      }else {
        this.vipTip = "加入会员可得5张9折卡本次省" + (this.totalProductPrice * 0.1).toFixed(2) + "元";
        this.deliverValue = 0;
      }

      console.log("totalProductPrice", this.totalProductPrice);
      console.log("this.addressId", this.addressId);
        //要把原有已选的值清空
        let params = this.$root.$mp.query;
        console.log(this.$root.$mp.query);
        //有两种路径，1 从购物车页面进来，2重新选择地址后返回
        if (null != params.addressId) {
          this.addressId = params.addressId;
        }
      this.getUserInfo();
      this.listUserAddress();
      this.getCoupon();
    }

  }
</script>

<style lang="scss" scoped>

  .order-submit-switch {
    margin: 0px 10px;
    width: 100px;
    height: 30px;
    border-radius: 20px;
    display: flex;
    border:1px solid black;
    align-items: center;
  }
  .switch-style {
    font-family: "Microsoft YaHei";
    font-size: 14px;
    width: 40px;
    height: 25px;
    border-radius: 15px;
    background-color: black;
    color: white;
    border: solid;
    text-align: center;
    line-height: 25px;
    padding: 0px 5px;
  }
  .vip_tip {
    background-image: linear-gradient(#847048, #D9C49A);
    color: black;
    font-size: 12px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    padding: 2px 10px 2px 2px;
    font-weight: bold;
  }
  .vip_tip_2 {
    background-color: #230000;
    padding: 2px;
    color: #D9C49A;
    font-size: 12px;
    font-weight: bold;
  }

  .un-switch-style {
    font-size: 14px;
    width: 40px;
    text-align: center;
    padding: 0px 5px;
    font-family: "Microsoft YaHei";
    line-height: 25px;

  }
  .order-submit-address {
    padding: 10px 0px;
  }
  .order-submit-address__deliver {
    display: flex;
    align-items: center;
    background-color: #F4F4F4;
    justify-content: space-between;
  }
  .order-submit-address__deliver-info {
    display: flex;
    flex-direction: column;
  }
  .order-submit-address__self {
    background-color: #F4F4F4;
  }
  .order-submit-time {
    display: flex;
  }
  .order-submit-summary {
    padding-bottom: 100px;
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
