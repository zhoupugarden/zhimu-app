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
          <div>
            <van-icon name="phone-o"></van-icon>
            {{contactInfo[chooseId]}}
          </div>
          <div>
            <van-icon name="location-o"></van-icon>
            {{contactAddress}}
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
      <van-cell :title="balanceCount" custom-class="custome-cell"/>
    </div>
    <div class="order-submit-product">
      <van-cell title="商品" :value= "productPrice" title-class="product-title-class" value-class="product-value-class"/>
      <van-cell :title="firstProduct" custom-class="custome-cell" is-link arrow-direction="down" @click="productPop"/>
    </div>
    <div class="order-submit-summary">
        <van-cell-group>
          <van-cell :title="totalAmountProduct" :value= "totalProductPrice" />
          <van-cell title="余额" :value= "balanceValue" />
          <van-cell title="优惠券" :value= "couponValue" />
          <van-cell title="配送费" :value= "deliverValue" />
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
      <coupon-item></coupon-item>
      <div style="position: fixed; bottom: 5px; width: 100%">
        <van-button type= "primary" @click = "noUseCoupon" custom-class="custom-button">不适用优惠券</van-button>
      </div>
    </van-popup>

    <van-popup :show="productPopShow"
               custom-style="height:80%"
               @close="closeProductPopup"
               position="bottom">
      <product-item :productItemInfo="productItemInfo"></product-item>
    </van-popup>

  </div>
</template>

<script>
  import CouponItem from '@/components/CouponItem';
  import ProductItem from '@/components/ProductItem';

  export default {
    components: {
      CouponItem,ProductItem
    },
    data() {
      return {
        switchValue: 1,
        chooseId:0,
        chooseDate:"日期",
        chooseTime:"时间",
        chooseCoupon:"未选择：",
        validCouponCount:"0张可用",
        totalAmountProduct:"2" + "件商品",
        balanceCount:3,
        productPrice:"￥" + 13,
        firstProduct:"测试商品",
        contactInfo: [
          "地址1",
          "地址2"
        ],
        contactAddress:"sdfdsf",
        selfAddress:"年家浜东路129弄",

        datePopShow:false,
        timePopShow:false,
        couponPopShow:false,
        productPopShow:false,
        currentDate: null,
        currentTime: null,
        minDate: new Date(2018, 0, 1).getTime(),
        timeColumns:['10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00'],
        productItemInfo: {
          url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567423333127&di=89d0c9226b130766a75d8219eb801f4e&imgtype=0&src=http%3A%2F%2Fpic43.nipic.com%2F20140705%2F2531170_165127150000_2.jpg",
          name:"测试商品",
          attr:"杯",
          price:"13.00",
          count:"12"
        },
        totalProductPrice:"133.00",
        balanceValue:"-" + "123",
        couponValue:"12",
        deliverValue:"11"

      }
    },
    methods: {
      switchOther() {
        this.switchValue = this.switchValue * -1;
        console.log("this.switchValue:", this.switchValue)
      },
      navigateToChooseAddress() {
        var url = "../myaddress/main?jump=true";
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
      }

    },
    computed: {
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
        return this.chooseCoupon + this.validCouponCount;
      }
    },
    mounted() {
      console.log(this.$root.$mp.query);
      if (null != this.$root.$mp.query.addressInfo) {
        this.chooseId = 1;

      }
    }

  }
</script>

<style lang="scss" scoped>

  .order-submit-switch {
    width: 80px;
    height: 30px;
    border-radius: 20px;
    border-color: black;
    display: flex;
    border: solid;
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
    padding-left: 5px;
  }
  .un-switch-style {
    font-size: 14px;
    font-family: "Microsoft YaHei";
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
  .order-submit-button {
    position: fixed;
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
    width: 100%;
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
