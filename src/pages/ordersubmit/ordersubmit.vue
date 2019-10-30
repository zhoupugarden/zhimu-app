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
          <div v-if="addressArray.length === 0">
            点击添加地址
          </div>
          <div v-else>
            <div>
              <van-icon name="phone-o"></van-icon>
              {{currentAddress.receiverName}} {{currentAddress.receiverPhone}}
            </div>
            <div>
              <van-icon name="location-o"></van-icon>
              {{currentAddress.addressName}} {{currentAddress.roadDetail}}
            </div>
          </div>
        </div>
        <div>
          <van-icon name="arrow"></van-icon>
        </div>
      </div>
      <div v-else class="order-submit-address__self">
        {{selfAddress}}
      </div>

    </div>
    <div style="font-weight: bolder">配送时间</div>
    <div class="order-submit-time">
      <div style="width: 50%">
        <van-cell title="日期" :value="currentDate" custom-class="custome-cell-time" is-link arrow-direction="down" @click="datePop"/>
      </div>
      <div style="width: 50%">
        <van-cell title="时间" :value="currentTime" custom-class="custome-cell-time" is-link arrow-direction="down" @click="timePop"/>
      </div>
    </div>
    <div style="font-weight: bolder">
      优惠券
    </div>

    <div class="order-submit-coupon">
      <van-cell :title="chooseCouponTip" custom-class="custome-cell" is-link arrow-direction="down" @click="couponPop"/>
    </div>
    <div style="font-weight: bolder">
      余额
    </div>
    <div class="order-submit-balance">
      <van-cell :title=" '' + userBalanceAmount" custom-class="custome-cell"/>
    </div>
    <div class="order-submit-product">
      <van-cell title="商品" :value= "'￥' + cartTotalPrice" title-class="product-title-class" value-class="product-value-class"/>
      <van-cell :title="cartProductListName" custom-class="custome-cell" is-link arrow-direction="down" @click="productPop"/>
    </div>
    <div class="order-submit-summary">
        <van-cell-group>
          <van-cell :title="cartTotalCount + '件商品'" :value= "'￥' + cartTotalPrice" />
          <van-cell title="余额" :value= "flag + userBalanceAmount" />
          <van-cell title="优惠券" :value= "flag + couponValue" />
          <van-cell title="配送费" :value= "flag + deliverValue" />
        </van-cell-group>
    </div>

    <div class="order-submit-button">
      <van-button custom-class="custom-button"
                  @click="orderSubmit"
                  type="primary"
      >微信付款{{restWxPayAmount}}</van-button>
    </div>

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
      <div v-for="(item , index) in couponCanUseList" :key="index" @click="chooseCouponItem(item)">

          <coupon-item :couponInfo="item" @preCheckCoupon="preCheckCoupon"></coupon-item>

      </div>
      <div style="position: fixed; bottom: 5px; width: 100%">
        <van-button type= "primary" @click = "noUseCoupon" custom-class="custom-button">不适用优惠券</van-button>
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
  import ProductItem from '@/components/ProductItem';
  import {toast} from '../../utils/toast';
  import {  mapActions } from 'vuex';
  import { mapGetters } from 'vuex';
  import {GET_COUPON_BY_USER_ID, MOCK_WX_PAY, GET_USER_ADDRESS, MY_USER_INFO,ORDER_SUBMIT, PRE_USE_COUPON} from '@/utils/api';
  import {request} from "@/utils/request";
  import {formatYMD} from "@/utils/dateUtil";


  export default {
    components: {
      CouponItem,ProductItem
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
        selfAddress:"年家浜东路129弄",
        datePopShow:false,
        timePopShow:false,
        couponPopShow:false,
        productPopShow:false,
        currentDate: null,
        currentTime: null,
        minDate: new Date(2018, 0, 1).getTime(),
        timeColumns:['10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00'],
        totalProductPrice:"133.00",
        balanceValue:"0",
        couponValue: 0,
        userInfo:{}
      }
    },
    methods: {
      ...mapActions(
        [
          'checkoutCartList'
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
          const date = new Date(detail);
         console.log(formatYMD(detail));
          this.currentDate = formatYMD(detail);
          this.datePopShow = false;
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

      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`;
        }
        return value;
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
            console.log("this response", response);
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
            console.log("this response", response);
          }
        )
      },

      convertCartList(data) {
        let productItems = [];
        let productItem = {};

        for(let item of data) {
          productItem.categoryId = item.categoryId;
          productItem.productId = item.productId;
          productItem.skuId = item.id;
          productItem.quantity = item.quantity;
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
              toast(response.failReason);
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
            console.log("validCouponList", validCouponList);

            console.log("couponCanUseList", this.couponCanUseList);
          }
        )
      },

      orderSubmit() {
        let params = {};
        params.userId = this.userId;
        params.addressId = this.addressId;
        params.deliverDate = this.currentDate;
        params.deliverTime = this.currentTime;

        if (this.restWxPayAmount === 0) {
          params.payType = 2;
        }else if (this.userBalanceAmount === 0) {
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
        params.remark = "留言待补充";

        request(
          ORDER_SUBMIT,
          'POST',
          params
        ).then(
          response => {
            this.checkoutCartList();
            console.log("this response", response);
            let orderNo = response.orderNo;
            if (response.orderStatus === 2) {
              toast("订单支付成功", 2000);
              this.navigateToOrderDetail(orderNo);
            } else {
              this.navigateToOrderDetail(orderNo);
            }
          }
        )

      }
    },
    computed: {
      ...mapGetters(
        [
           'cartList','cartTotalCount','cartTotalPrice','cartProductListName','token','userId'
        ]
      ),

      deliverValue() {
        if(this.cartTotalPrice < 30) {
          return 8;
        }
        if (this.cartTotalPrice >=30 && this.cartTotalPrice < 30) {
          return 5;
        }
        if (this.cartTotalPrice >= 100) {
          return 0;
        }
      },
      currentAddress() {
        if(this.addressId === 0 && this.addressArray.length > 0) {
          let addressItem =  this.addressArray.find(item => item.isDefault === 1);
          this.addressId = addressItem.id;
          return addressItem;
        }else {
          console.log("this.addressId:", this.addressArray.filter(item => item.id === Number(this.addressId)))
          return this.addressArray.find(item => item.id === Number(this.addressId));
        }
      },

      userBalanceAmount() {
        console.log("balanceMount, cartTotalPrice", this.userInfo.balanceAmount , this.cartTotalPrice)

        if (this.userInfo.balanceAmount >= this.cartTotalPrice) {
          return this.cartTotalPrice - this.couponValue;
        } else {
          return this.userInfo.balanceAmount;
        }
      },

      restWxPayAmount() {
        return this.cartTotalPrice + this.deliverValue - this.couponValue - this.userBalanceAmount;
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
        }
        if (this.couponCanUseList.length > 0) {
          return "未选择：" + this.couponCanUseList.length + "张可用";
        } else {
          return "无可用优惠券";
        }
      }

    },
    onShow() {
      console.log("this.addressId", this.addressId);
        //要把原有已选的值清空
        let params = this.$root.$mp.query;
        console.log(this.$root.$mp.query);
        //有两种路径，1 从购物车页面进来，2重新选择地址后返回
        if (null != params.addressId) {
          this.addressId = params.addressId;
        }
        this.listUserAddress();
        this.getCoupon();
        this.getUserInfo();
        let myDate = new Date();
        this.currentDate = "2019-10-10";
        this.currentTime = "10:00-11:00";
    },
    onUnload() {
      console.log("onUnload");
      let url = "/pages/cart/main";
      wx.switchTab({
        url: url
      });
    }
  }
</script>

<style lang="scss" scoped>

  .order-submit-switch {
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
  .un-switch-style {
    font-size: 14px;
    width: 40px;
    text-align: center;
    padding: 0px 5px;
    font-family: "Microsoft YaHei";
    line-height: 25px;

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
