<template>
  <div class="cart-container">
    <div class="cart-no-container" v-if="isEmptyCart">
      <van-icon size="30px" color="#b2b2b2" name="shopping-cart-o"></van-icon>
      <div style="font-size: 14px; color: #b2b2b2;">您的购物车是空的</div>
    </div>
    <div v-else>
      <div class="cart-container__detail">
        <div v-for="(item, index) in cartProductList" :key="index">
          <cart-card
            @increItem="increItem"
            @decreItem="decreItem"
            @removeItem="removeItem"
            :quantity="item.quantity"
            :cardItem="item"></cart-card>
        </div>

        <div v-for="(item, index) in cartFittingList" :key="index">
          <cart-card
            @increItem="increItem"
            @decreItem="decreItem"
            @removeItem="removeItem"
            :quantity="item.quantity"
            :cardItem="item"></cart-card>
        </div>
      </div>
      <div v-show="showTip" class="cart-container__tip">
        <div style="font-size: 14px;color: #b2b2b2; padding: 20px 0px;">
          请在下方选择需要的配件
        </div>
      <div class="cart-container__fitting">
        <div class="cart-container__fitting--nav">
          <span v-for="(free, index) in freeGood" :key="index">
            <van-button custom-style="color:#323233" color="#f2f2f2" size="small" @click="addFreeFitting(free)">{{free.fittingName}}</van-button>
          </span>
          <van-button custom-style="color:#323233" color="#f2f2f2" size="small" @click="popUpShow">配件饰品</van-button>
        </div>
        <div class="cart-container__fitting--detail">
          <div v-for="(item_, index) in freeCartList" :key="index">
            <free-card
                       @delFromCart="removeFreeItem"
                       @fieldChange="fieldChange"
                       :freeItem="item_"
                       :extroValue="birthAge"
            ></free-card>
          </div>
        </div>
      </div>
      </div>
      <div class="cart-container__bottom">
        <div class="cart-container__bottom--line">
        </div>
        <div class="cart-container__bottom--total">
          <div style="padding: 0px 15px;">
            总计：￥{{totalPrice}}
          </div>
          <div v-if="totalPrice < deliverConfig.freePrice" class="cart-container__bottom--fee">
            <span>另需配送费</span>
            <span>{{deliverFee}}元</span>
            <span v-show="totalPrice < deliverConfig.secPrice">
              <span>,再买</span>
              <span style="color: red">{{needAmount}}元</span>
              <span>可减</span>
              <span style="color: red">{{freeFee}}元</span>
              <span>配送费</span>
            </span>
          </div>
          <div v-else style="font-size: 10px;">
            <span>免配送费</span>
          </div>
        </div>

        <div class="cart-container__bottom--button">
          <van-button color="#000000" size="large" type="primary" @click="navigateToSubmitOrLogin">下一步</van-button>
        </div>
      </div>
      <van-popup position="bottom"
                 :show="popShow"
                 custom-class="van-popup__custom--cart"
                 @close="popUpClose"
      >
        <div class="van-popup__custom--container">
          <div class="van-popup__custom--container_cross" >
            <van-icon size="20" @click="popUpClose" name="cross" />
          </div>

          <div class="van-popup__custom--container_detail">
            <div class="van-popup__custom--container_detail_item" v-for="(item, index) in payGood" :key="index">
              <pay-card
                @addToCart="addGoodToCart"
                :item="item"
              ></pay-card>
            </div>
          </div>
        </div>
      </van-popup>
    </div>

    <div>
      <van-popup
                 :show="agePopShow"
                 @close="popUpClose"
      >
        <div class="age-popup">
          <div style="font-weight: bold; ">
            蜡烛数字
          </div>
            <div style="width: 200px; margin: 0 auto;">
              <van-field
                clearable
                :value="birthAge"
                placeholder="请输入蜡烛数字"
                border="false"
                @change="birthAgeChange"
              />
            </div>
          <div>
            <span style="margin-right: 100px;"><van-button size="small" @click="agePopUpClose">取消</van-button></span>
            <span><van-button color="#353535" size="small" @click="confirmBirthAge">确认</van-button></span>
          </div>
        </div>
      </van-popup>
    </div>





    <van-toast  id="van-toast"/>
  </div>
</template>

<script>
  import cartCard from '@/components/cartCard';
  import FreeCard from '@/components/FreeCard';
  import PayCard from '@/components/PayCard';
  import { mapGetters, mapActions ,mapState} from 'vuex';

  import { GET_FITTING_LIST, CART_PRODUCT_CHECK} from '@/utils/api';
  import {request} from "@/utils/request";
  import {pageUrlEnum, freeFittingEnum} from "@/utils/enums";
  import {toast} from '@/utils/toast';

  import numeral from 'numeral';

  export default {
  components: {
    cartCard, FreeCard, PayCard
  },

  data() {
    return {
      popShow:false,
      agePopShow:false,
      birthAge:"",
      payGood: [],
      totalPrice: 0,
      remark:"",
      totalCartList:[],
      freeGood:[],
      freeCandleData:null,
    }
  },
  computed: {
    ...mapGetters(
      [
        'freeCartList',
        'cartTotalPrice',
        'isExistCake',
        'isLogin',
        'cartList',
        'cartProductList',
        'cartFittingList'
      ]
    ),
    ...mapState({
      deliverConfig: state=>state.merchant.deliverConfig,
      cartList:state=>state.cartList
    }),

    freeList() {
        return this.$store.getters.freeCartList
    },

    showTip() {
      let cake = this.$store.getters.cartList.find(
        i => i.type === 1
      );
      if (cake) {
        return true;
      } else {
        return false;
      }
    },

    isEmptyCart() {
      if (this.$store.getters.cartList.length) {
        return false;
      }else {
        return true;
      }
    },

    deliverFee() {
      if (this.totalPrice < this.deliverConfig.beginPrice) {
        return this.deliverConfig.beginFee;
      } else if (this.totalPrice >= this.deliverConfig.beginPrice && this.totalPrice < this.deliverConfig.secPrice) {
        return this.deliverConfig.beginFee;

      } else if (this.totalPrice >= this.deliverConfig.secPrice && this.totalPrice < this.deliverConfig.freePrice) {
        return this.deliverConfig.secFee;
      } else {
        return 0;
      }
    },
    needAmount() {
       if (this.totalPrice < this.deliverConfig.secPrice) {
        return this.deliverConfig.secPrice - this.totalPrice;
      }
      else if (this.totalPrice >= this.deliverConfig.secPrice && this.totalPrice < this.deliverConfig.freePrice) {
        return this.deliverConfig.freePrice - this.totalPrice;
      }else {
        return 0
      }
    },
    freeFee() {
  if (this.totalPrice < this.deliverConfig.secPrice) {
        return this.deliverConfig.beginFee - this.deliverConfig.secFee;
      }
      else if (this.totalPrice >= this.deliverConfig.secPrice && this.totalPrice < this.deliverConfig.freePrice) {
        return 5;
      } else {
        return 0
      }
    }

  },
  methods: {
    ...mapActions(
      [
        'delProductFromCart',
        'incrementInventory',
        'decrementInventory',
        'addProductToCart',
        'addFreeCart',
        'delFreeFromCart',
        'checkoutFreeCartList',
        'updateFreeFromCart'
      ]
    ),
    addFreeFitting(data) {
      let params = {};
      params.fittingId = data.fittingId;
      console.log("data", data);
      if (data.fittingId === freeFittingEnum.num_candle.value) {
        this.freeCandleData = data;
        this.agePopShow = true;
      }else {
        this.addFreeCart(data);
      }
    },

    birthAgeChange(event) {
      console.log("event", event);
      this.birthAge = event.mp.detail;
    },

    confirmBirthAge() {
      let data = this.freeCandleData;
      this.addFreeCart(data);
      this.agePopUpClose();
    },


    getFittingList() {
      request(
        GET_FITTING_LIST,
        'GET'
      ).then(
        response => {
          this.payGood = response.fittingList;
          this.freeGood = response.freeFittingList;
        }
      )
    },
    cartProductCheck() {
      let params = {};
      let cartInfoList = [];
      for(let product of this.cartList) {
        let cartInfo = {};
        cartInfo.skuId = product.skuId;
        cartInfo.quantity = product.quantity;
        cartInfoList.push(cartInfo);
      }
      params.cartSkuInfoList = cartInfoList;
      request(
        CART_PRODUCT_CHECK,
        'POST',
        params
      ).then(
        (response) => {
          if (response) {
            wx.navigateTo({
              url:pageUrlEnum.order_submit_url
            });
          }
        }
      )
    },

    popUpClose() {
      this.popShow = false;
    },
    popUpShow() {
      this.popShow = true;
    },

    agePopUpClose() {
      this.agePopShow = false;
    },
    navigateToSubmitOrLogin() {
      if (!this.isLogin) {
        wx.navigateTo({
          url:pageUrlEnum.login_url
        });
      } else {
        this.cartProductCheck();
      }

    },
    removeItem(data) {
      let that = this;
      wx.showActionSheet({
        itemList:["删除"],
        success: function(res) {
          if(res.tapIndex === 0){
            that.delProductFromCart(data);
            that.calcTotalPrice();
          }
        },
      });

    },
    removeFreeItem(data) {
      this.delFreeFromCart(data);
    },
    fieldChange(data) {
      let productName = data.productName;
      let value = data.value;
      let freeItem = this.$store.state.freeList.find(i => i.productName === productName);
      this.updateFreeFromCart(data);
    },

    calcTotalPrice() {
      this.totalCartList = this.cartList;
      if (this.totalCartList.length === 0) {
        this.totalPrice = 0.00;
      } else {
        let tmpTotalPrice = 0;
        for (let index in this.totalCartList) {
          let item = this.totalCartList[index];
          let itemPrice = item.salePrice * item.quantity;
          tmpTotalPrice = tmpTotalPrice + itemPrice;
        }
        this.totalPrice = tmpTotalPrice.toFixed(2);
      }
    },

    increItem(data) {
      this.incrementInventory(data);
      this.calcTotalPrice();
    },
    decreItem(data) {
      this.decrementInventory(data);
      this.calcTotalPrice();
    },
    addGoodToCart(data) {
      this.popShow = false;
      this.addProductToCart(data);
      this.calcTotalPrice();
    }
  },
  onShow() {
    this.calcTotalPrice();
    this.getFittingList();
  }
}
</script>

<style lang="scss" scoped>
  @import "cart.scss";
</style>
<style lang="scss">
  .van-popup--bottom {
    height: 60% !important;
  }
  /*放在scope里面不行*/
  .van-popup__custom--cart {
    background-color: red;
    width: 100%;
    height: 90%;
    padding: 20px;
  }
  .van-popup__custom--container {

  }

</style>
<style lang="wxss">
  page{
    height: 100%;
    background-color:#f2f2f2 !important;
  }
</style>
