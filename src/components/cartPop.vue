<template>
  <div class="cart-pop-container">
    <van-popup :position="position"
               :show="popShow"
               z-index="200"
               custom-style="left:5%; top:30%; width:90%;height:50%;background-color:transparent;overflow:hidden;"
               @close="popUpClose"
               >
      <div class="van-popup__panel" :style="transformFront">
        <div style="position: relative">
          <div style="margin: 0 auto;width: 90%;">
            <div style="display: flex;align-items: center;border-bottom: 1px solid #f2f2f2; ">
              <span class="van-popup__panel_price">
                {{chooseSKU.salePrice}}
              </span>
              <span v-show="chooseSKU.promoteType===1004" class="zm-goods__price-lineprice">
                {{chooseSKU.linePrice}}
              </span>
              <span style="color: red; font-size: 10px; padding-left: 10px" v-show="chooseSKU.stock <= chooseSKU.warnStock">少量库存</span>
            </div>
            <div class="van-popup__panel_extro">
              <div v-show="chooseSKU.cakeSize" class="van-popup__panel_extro__item">
                <div style="display: flex">
                  <img src="../asset/cake_2.png" style="width: 20px; height: 20px; ">
                  <span class="font_setting">{{chooseSKU.cakeSize}}</span>
                </div>
              </div>
              <div v-show="chooseSKU.capacity" class="van-popup__panel_extro__item">
                <div style="display: flex">
                  <img src="../asset/people.png" style="width: 20px; height: 20px; ">
                  <span class="font_setting">{{chooseSKU.capacity}}</span>
                </div>
              </div>
              <div v-show="chooseSKU.copies" class="van-popup__panel_extro__item">
                <div style="display: flex">
                  <img src="../asset/time.png" style="width: 20px; height: 20px; ">
                  <span class="font_setting">{{chooseSKU.copies}}</span>
                </div>
              </div>
              <div v-show="cutleryDesc" class="van-popup__panel_extro__item">
                <div style="display: flex">
                  <img src="../asset/cutlery.png" style="width: 20px; height: 20px; ">
                  <span class="font_setting">{{cutleryDesc}}</span>
                </div>
              </div>
              <div class="van-popup__panel_extro__item">
                <div style="display: flex">
                  <img src="../asset/cutlery.png" style="width: 20px; height: 20px; ">
                  <span class="font_setting">{{deliverTime}}</span>
                </div>

              </div>
            </div>
            <div style="font-family: 'Microsoft YaHei'; font-size: 14px;padding:10px 0px;">规格</div>
            <div  class="van-popup__panel_attribute">
          <span style="margin-right: 5px;" v-for="(item, index) in productSKUs" :key="index">
                <check-box
                  :skuItem="item"
                  :type="item.skuId === chooseSKU.skuId ? 'selected' : 'default'"
                  @selectedSKU="selectedSKU"
                ></check-box>
            </span>
            </div>
          </div>
          <div class="van-popup__panel_shopcart">
            <van-button custom-class= "button-custom" color="#000000" @click="addToCart">
              {{popupText}}
            </van-button>
          </div>
        </div>
      </div>
      <div class="van-popup__panel-back" :style="transformBack">
        <div style="display: flex;flex-direction: column;justify-content: center;position: relative; align-items: center;">
          <div style="position: absolute;top: 0px;right: 0px;padding: 10px;">
            <van-icon @click="continueBuy" name="cross"></van-icon>
          </div>
          <div style="position: relative">
            <div>
              <img src="../asset/duigou.png" style="width: 60px; height: 60px;padding: 10px">
            </div>
          </div>
          <div>
            已加入购物车
          </div>

          <div style="padding: 80px;">
            <div style="padding: 5px;">
              <van-button size="small" custom-class="button-custom_pop" color="#000000" @click="navigateToCart">进入购物车</van-button>
            </div>
            <div style="padding: 5px;">
              <van-button size="small" custom-class="button-custom_pop" color="#000000" plain @click="continueBuy">继续逛逛</van-button>
            </div>
          </div>
        </div>

      </div>
    </van-popup>
  </div>
</template>

<script>
  import CheckBox from '@/components/CheckBox';

  export default {
  name: 'cart-pop',
    components: {
      CheckBox
    },
  props: {
    popShow: Boolean,
    productSKUs: Array,
    productId:Number,
    popupText: {
      type: String,
      default:"加入购物车"
    }
  },
  data() {
    return {
      chooseSKU:{},
      active:0,
      cutlery:0
    }
  },

  methods: {
    closeActive() {
      this.active = 0;
    },
    navigateToCart() {
      this.$emit('popUpClose');
      this.popShow = false;
      let that = this;
      setTimeout(
        () => {
          that.closeActive();
          let url = "../cart/main";
          console.log("url",url);
          wx.switchTab({
            url
          });
        }, 500
      );

    },
    continueBuy() {
      this.$emit('popUpClose');
      this.popShow = false;
      let that = this;
      setTimeout(
        () => {
          that.closeActive();
        }, 1000
      );
    },
    popUpClose() {
      console.log("popUpClose");
      this.popShow = false;
      this.$emit('popUpClose');
    },
    addToCart() {
      this.$emit('addProductToCart', this.chooseSKU);
      this.active = 1;
    },
    selectedSKU(event) {
      console.log("event", event);
      this.chooseSKU = this.productSKUs.find(
        sku => sku.skuId === event
      );
      console.log("this.chooseSku", this.chooseSKU)
    }
  },

  watch: {
    productSKUs() {
      console.log("this.productSKUs", this.productSKUs);
      this.chooseSKU = this.productSKUs[0];
    },
  },

  computed: {
      transformFront() {
        if (this.active === 1 && this.popShow === true) {
          return "transform:" + "rotateY(180deg)";
        } else {
          return "transform:" + "rotateY(0deg)";
        }
      },
      transformBack() {
        if (this.active === 1 && this.popShow === true) {
          return "transform:" + "rotateY(0deg)";
        } else {
          return "transform:" + "rotateY(-180deg)";
        }
      },

    deliverTime() {
      if (this.chooseSKU.deliverTime === 1001 || this.chooseSKU.deliverTime === 1002) {
        return "现货下单立即配送";
      } else {
        // 如果跨夜统一为第二天营业时间配送
          return "最早明天10点可配送";
        }
    },
    cutleryDesc() {
        if (!this.chooseSKU.cutlery) {
          return "";
        }else {
          return "含" + this.chooseSKU.cutlery + "套餐具";
        }
    }
  }
  }
</script>

<style lang="scss" scoped>

  .font_setting {
    font-size: 13px;
    font-family: 'Microsoft YaHei';
    padding-left: 5px;
  }

  .cart-pop-container {
    position: relative;
  }
  .van-popup__panel-back {
    position: absolute;
    backface-visibility: hidden;
    transform: rotateY(-180deg);
    transition: all 1s;
    background-color: white;
    left: 20%;
    height: 100%;
    width: 60%;
  }
  .van-popup__panel {
    position: absolute;
    backface-visibility: hidden;
    transform: rotateY(0deg);
    transition: all 1s;
    background-color: white;
    height: 100%;
    width: 100%;
  }

  .van-popup__panel_price {
    padding-bottom: 10px;
    padding-top: 10px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
  }

  .van-popup__panel_attribute {
    display: flex;
  }

  .van-popup__panel_price:before {
    content:'￥';
  }
  .van-popup__panel_line {
    width:80%;
    margin:0 auto;
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
  .van-popup__panel_extro {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
  }
    .van-popup__panel_extro__item {
      box-sizing: border-box;
      flex: 0 0 50%;
      padding: 5px 5px;
      font-size: 16px;
      font-family: "Microsoft YaHei";
    }
  .van-popup__panel_shopcart {
    width: 100%;
    position: fixed;
    bottom: 0px;

  }

  .zm-goods__price-lineprice {
    font-family: "Microsoft YaHei";
    padding-right: 5px;
    font-size: 10px;
    color: #CFD4DA;
    text-decoration:line-through;
  }
  .zm-goods__price-lineprice:before {
    content:'原价 ￥';
    text-decoration:line-through;
    font-size: 10px;
  }



</style>

<style lang="scss">
  .button-custom {
    width: 100%;
  }
  .button-custom_pop {
    width: 100px;
  }

</style>
