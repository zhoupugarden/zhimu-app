<template>
  <div class="cart-container">
    <div class="cart-no-container" v-if="isEmptyCart">
      <van-icon name="shopping-cart-o"></van-icon>
      <div style="font-size: small; font-family: 'Microsoft YaHei'">您的购物车是空的</div>
    </div>
    <div v-else>
      <div class="cart-container__detail">
        <div v-for="(item, index) in cartList" :key="index">
          <cart-card
            @increItem="increItem"
            @decreItem="decreItem"
            @removeItem="removeItem"
            :cardItem="item"></cart-card>
        </div>
      </div>
      <div v-show="showTip" class="cart-container__tip">
        请在下方选择需要的配件
      <div class="cart-container__fitting">
        <div class="cart-container__fitting--nav">
          <van-button size="small" @click="addFire">数字蜡烛</van-button>
          <van-button size="small" @click="addChocolate">巧克力牌</van-button>
          <van-button size="small" @click="popUpShow">配件饰品</van-button>
        </div>
        <div class="cart-container__fitting--detail">
          <div v-for="(item_, index) in freeCartList" :key="index">
            <free-card
                       @delFromCart="removeFreeItem"
                       @fieldChange="fieldChange"
                       :freeItem="item_"
            ></free-card>
          </div>
        </div>
      </div>
      </div>
      <div class="cart-container__bottom">
        <div class="cart-container__bottom--line">
        </div>
        <div class="cart-container__bottom--total">
          <div>
            总计：￥{{cartTotalPrice}}
          </div>
          <div v-show="cartTotalPrice < 100" class="cart-container__bottom--fee">
            <span>另需配送费</span>
            <span>{{deliverFee}}元,</span>
            <span>再买</span>
            <span style="color: red">{{needAmount}}元</span>
            <span>可减</span>
            <span style="color: red">{{freeFee}}元</span>
            <span>配送费</span>
          </div>
        </div>

        <div class="cart-container__bottom--button">
          <van-button size="large" type="primary" @click="navigateToSubmitOrLogin">下一步</van-button>
        </div>
      </div>
      <van-popup position="bottom"
                 :show="popShow"
                 custom-class="van-popup__custom--cart"
                 @close="popUpClose"
      >
        <div class="van-popup__custom--container">
          <div >
            <van-icon @click="popUpClose" name="cross" />
          </div>
          <div v-for="(item, index) in payGood" :key="index">
            <pay-card
                @addToCart="addGoodToCart"
              :item="item"
            ></pay-card>
          </div>
        </div>
      </van-popup>
      <van-dialog id="van-dialog" />
    </div>
  </div>
</template>

<script>
  import cartCard from '@/components/cartCard';
  import FreeCard from '@/components/FreeCard';
  import PayCard from '@/components/PayCard';
  import { mapGetters, mapActions } from 'vuex';
  import { SET_OPEN_ID } from '@/store/mutation-types';
  import Dialog from '../../../static/vant/dialog/dialog';

  import {PAY_FITTING_LIST} from '@/utils/api';
  import {request} from "@/utils/request";


  const freeGood = [
    {
      url: "https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
      productName:"巧克力牌",
      attributeName:"1个",
      holdValue:"请输入祝福语(14字内)",
    },
    {
      url: "https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
      productName:"数字蜡烛",
      attributeName:"1个",
      holdValue:"请输入年龄",
    }
  ];

  export default {
  components: {
    cartCard, FreeCard, PayCard
  },

  data() {
    return {
      totalAmount: 1000,
      popShow:false,
      payGood: [],
      birthNum:"",
      remark:""
    }
  },
  computed: {
    ...mapGetters(
      [
        'freeCartList',
        'cartTotalPrice',
        'isExistCake',
        'userId'
      ]
    ),
    cartList() {
      return this.$store.getters.cartList;
      this.$forceUpdate()
    },
    freeList() {
      console.log("this.$store.state.freeList", this.$store.state.freeList)
        return this.$store.getters.freeCartList
    },

    showTip() {
      let cake = this.$store.getters.cartList.find(
        i => i.type === 1
      );
      console.log("cake", cake)
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
      if (this.cartTotalPrice < 30) {
        return 8;
      }
      else if (this.cartTotalPrice >= 30 && this.cartTotalPrice < 100) {
        return 5;
      } else {
        return 0
      }
    },
    needAmount() {
      if (this.cartTotalPrice < 30) {
        return 30 - this.cartTotalPrice;
      }
      else if (this.cartTotalPrice >= 30 && this.cartTotalPrice < 100) {
        return 100 - this.cartTotalPrice;
      }else {
        return 0
      }
    },
    freeFee() {
      if (this.cartTotalPrice < 30) {
        return 3;
      }
      else if (this.cartTotalPrice >= 30 && this.cartTotalPrice < 100) {
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

    payFittingList() {
      request(
        PAY_FITTING_LIST,
        'GET'
      ).then(
        response => {
          this.payGood = response;
          console.log("this response", response);
          this.popShow = true;
        }
      )
    },

    storeButton() {
      this.setOpenId("123456")
    },
    popUpClose() {
      console.log("popUpClose");
      this.popShow = false;
    },
    popUpShow() {
      this.payFittingList()
    },
    navigateToSubmitOrLogin() {
      let submitUrl = "/pages/ordersubmit/main";
      let loginUrl = "/pages/login/main";
      let url = "";

      //add-free-cart

      if (this.userId) {
        url = submitUrl;
      } else {
        url = loginUrl;
      }
      wx.navigateTo({
        url
      });
    },
    removeItem(data) {
      console.log(data);
      Dialog.confirm({
        title: '删除确认'
      }).then(() => {
        this.delProductFromCart(data);
      }).catch(() => {
        // on cancel
      });
    },

    removeFreeItem(data) {
      console.log("removeFreeItem", data);
      this.delFreeFromCart(data);
    },
    fieldChange(data) {
      console.log("fieldChange: ", data);
      let productName = data.productName;
      let value = data.value;
      let freeItem = this.$store.state.freeList.find(i => i.productName === productName);

      this.updateFreeFromCart(data);
    },

    increItem(data) {
      console.log(data)
      this.incrementInventory(data)
    },
    decreItem(data) {
      console.log(data)
      this.decrementInventory(data)
    },
    addGoodToCart(data) {
      console.log("Card good",data);
      this.popShow = false;
      this.addProductToCart(data);
    },
    addChocolate() {
      let data = {};
      data.url = freeGood[0].url;
      data.productName = freeGood[0].productName;
      data.holdValue = freeGood[0].holdValue;
      data.value = this.remark;
      this.addFreeCart(data);
    },
    addFire() {
      let data = {};
      data.url = freeGood[1].url;
      data.holdValue = freeGood[1].holdValue;
      data.productName = freeGood[1].productName;
      data.value = this.birthNum;
      this.addFreeCart(data);
      this.$forceUpdate();
    }

  },
  onShow() {
    console.log("需要检查库存")
  }
}
</script>

<style lang="scss" scoped>
  .cart-close {
    background-color: red;
  }
  .cart-container {
    position: relative;
    height: 100%;
  }
  .cart-no-container {
    position: absolute;
    top: 40%;
    left: 40%;
    text-align: center;
  }

  .cart-container__bottom {
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0;
    z-index: 100;
    background-color: white;
  }
  .cart-container__popup {
    z-index: -1;
  }
  .cart-container__bottom--button {
    position: fixed;
    bottom: 20px;
    width: 90%;
    /*还需要仔细研究如何居中显示*/
    left: 4%;
  }
  .cart-container__tip {
    padding-top: 20px;
    font-size: 50%;
    font-weight: lighter;
    text-align: center;
  }
  .cart-container__bottom--line {
    width: 100%;
    height: 1px;
    border-top: solid #ACC0D8 1px;
  }
  .cart-container__bottom--fee {
    font-size: 50%;
    padding-left: 10px;
  }
  .cart-container__bottom--total {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .cart-container__fitting--nav {
    display: flex;
    justify-content: space-around;
    padding-bottom: 10px;
  }
  .cart-container__popup--detail {
    padding-bottom: 10px;
  }

  .cart-container__popup {
    position: relative;
  }
  .cart-container__fitting {
    padding-top: 10px;
    padding-bottom: 100px;

  }



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
    background-color:#F4F4F4 !important;
  }
</style>
