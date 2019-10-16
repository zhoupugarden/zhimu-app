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
        <van-cell :title="chooseDate" custom-class="custome-cell" is-link arrow-direction="down" @click="datePop"/>
      </div>
      <div style="width: 50%">
        <van-cell :title="chooseTime" custom-class="custome-cell" is-link arrow-direction="down" @click="timePop"/>
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
      <van-cell :title="userBalanceAmount" custom-class="custome-cell"/>
    </div>
    <div class="order-submit-product">
      <van-cell title="商品" :value= "'￥' + cartTotalPrice" title-class="product-title-class" value-class="product-value-class"/>
      <van-cell :title="cartProductListName" custom-class="custome-cell" is-link arrow-direction="down" @click="productPop"/>
    </div>
    <div class="order-submit-summary">
        <van-cell-group>
          <van-cell :title="cartTotalCount + '件商品'" :value= "'￥' + cartTotalPrice" />
          <van-cell title="余额" :value= "flag + balanceValue" />
          <van-cell title="优惠券" :value= "flag + couponValue" />
          <van-cell title="配送费" :value= "flag + deliverValue" />
        </van-cell-group>
    </div>

    <div class="order-submit-button">
      <van-button custom-class="custom-button"
                  type="primary"
      >微信付款{{totalProductPrice}}</van-button>

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

          <coupon-item :couponInfo="item"></coupon-item>

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

  import { mapGetters } from 'vuex';

  import {GET_COUPON_BY_USER_ID, GET_USER_ADDRESS, MY_USER_INFO} from '@/utils/api';
  import {request} from "@/utils/request";


  export default {
    components: {
      CouponItem,ProductItem
    },
    data() {
      return {
        flag:'￥',
        switchValue: 1,
        addressId:0,
        chooseDate:"日期",
        chooseTime:"时间",
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
        balanceValue:"-" + "123",
        couponValue: 0,
        deliverValue:"11",
        userInfo:{}
      }
    },
    methods: {
      switchOther() {
        this.switchValue = this.switchValue * -1;
        console.log("this.switchValue:", this.switchValue)
      },
      navigateToChooseAddress() {
        var url = "../myaddress/main?jump=" + "true";
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
          this.currentDate = date.toLocaleDateString();
          this.chooseDate = "日期" + this.currentDate;
          this.datePopShow = false;
        }else {
          this.datePopShow = false;

        }
      },
      noUseCoupon() {
        this.couponPopShow = false;
      },
      chooseCouponItem(item) {
        if (this.cartTotalPrice < item.minAmount) {
          toast("抱歉，此优惠券满" + item.minAmount + "可用");
        } else {
          this.couponPopShow = false;
          console.log(item);
          this.couponValue = item.disAmount;
        }
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
        this.chooseTime = "时间" + this.currentTime;
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
      getCoupon() {
        let params = {};
        params.userId = 1;
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
            console.log("validCouponList", validCouponList)

            // this.couponCanUseList = validCouponList.filter(item => {
            //   if (item.couponType === 1) {
            //     return this.cartTotalPrice > 100;
            //   }
            //
            //   if (item.couponType === 4) {
            //     return false;
            //   }
            //
            //   if (item.couponType === 5) {
            //     //判断满足条件的商品与购物车的商品比较
            //     // return this.cartList.cartItem.goodTypes === item.goodsvalue;
            //
            //   } else {
            //     return true;
            //   }
            // });

            console.log("couponCanUseList", this.couponCanUseList);
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

      currentAddress() {
        if(this.addressId === 0) {
          return this.addressArray[0];
        }else {
          console.log("this.addressId:", this.addressArray.filter(item => item.id === Number(this.addressId)))
          return this.addressArray.find(item => item.id === Number(this.addressId))
        }
      },

      userBalanceAmount() {
        if (this.userInfo.balanceAmount > this.cartTotalPrice) {
          return this.cartTotalPrice;
        } else {
          return this.userInfo.balanceAmount;
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
        }

        if (this.couponCanUseList.length > 0) {
          return "未选择：" + this.couponCanUseList.length + "张可用";
        } else {
          return "无可用优惠券";
        }

        return this.chooseCoupon + this.validCouponCount;
      }

    },
    onShow() {
      //要把原有已选的值清空
      this.chooseDate = "日期";
      this.chooseTime = "时间";
      let params = this.$root.$mp.query;
      console.log(this.$root.$mp.query);
      //有两种路径，1 从购物车页面进来，2重新选择地址后返回
      if (null != params.addressId) {
        this.addressId = params.addressId;
      }
      this.listUserAddress();
      this.getCoupon();
      this.getUserInfo();
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
