<template>
  <div class="cart-pop-container">
    <van-popup :position="position"
               :show="popShow"
               z-index="200"
               custom-style="left:5%; top:30%; width:90%"
               @close="popUpClose"
               >
      <div class="van-popup__panel">
        <div style="padding-left: 10%; padding-bottom:10px;">
          <div style="display: flex;align-items: center">
            <div class="van-popup__panel_price">
              {{chooseSKU.salePrice}}
            </div>
            <span style="color: red; padding-left: 10px" v-show="productSKUs.stock < 5">少量库存</span>
          </div>
          <div class="van-popup__panel_extro">
            <div class="van-popup__panel_extro__item">
              <div style="display: flex">
                <img src="../asset/cake_2.png" style="width: 20px; height: 20px; ">
                <span class="font_setting">{{chooseSKU.cakeSize}}</span>
              </div>
            </div>
            <div class="van-popup__panel_extro__item">
              <div style="display: flex">
                <img src="../asset/people.png" style="width: 20px; height: 20px; ">
                <span class="font_setting">{{chooseSKU.capacity}}</span>
              </div>
            </div>
            <div class="van-popup__panel_extro__item">
              <div style="display: flex">
                <img src="../asset/time.png" style="width: 20px; height: 20px; ">
                <span class="font_setting">{{chooseSKU.copies}}</span>
              </div>
            </div>
            <div class="van-popup__panel_extro__item">
              <div style="display: flex">
                <img src="../asset/cutlery.png" style="width: 20px; height: 20px; ">
                <span class="font_setting">{{chooseSKU.cutlery}}</span>
              </div>
            </div>

            <div class="van-popup__panel_extro__item">
              <div style="display: flex">
                <img src="../asset/cutlery.png" style="width: 20px; height: 20px; ">
                <span class="font_setting">{{deliverTime}}</span>
              </div>

            </div>
          </div>
          <div style="font-family: 'Microsoft YaHei'; font-size: 12px;padding:10px 0px;">规格</div>
          <div class="van-popup__panel_attribute">
          <span v-for="(item, index) in productSKUs.pmsProductSkuList" :key="index">
                <check-box
                  :id="item.skuId"
                  :name="item.attributeName"
                  :type="item.skuId === chooseSKU.skuId ? 'selected' : 'default'"
                  @selectedSKU="selectedSKU"
                ></check-box>
            </span>
          </div>
        </div>
        <div class="van-popup__panel_shopcart">
          <van-button custom-class= "button-custom" type="warning" @click="addToCart">
            {{popupText}}
          </van-button>
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
    productSKUs: Object,
    productInfo: Object,
    position: {
      type: String
    },
    popupText: {
      type: String,
      default:"加入购物车"
    }
  },
  data() {
    return {
      chooseSKU:{}
    }
  },

  methods: {
    popUpClose() {
      console.log("popUpClose");
      this.popShow = false;
      this.$emit('popUpClose');
    },
    addToCart() {
      this.$emit('addProductToCart', this.chooseSKU);
    },
    selectedSKU(event) {
      console.log("event", event);
      this.chooseSKU = this.productSKUs.pmsProductSkuList.find(
        sku => sku.skuId === event
      );
      console.log("this.chooseSku", this.chooseSKU)
    }
  },

  watch: {
    productSKUs() {
      this.chooseSKU = this.productSKUs.pmsProductSkuList.find(
        function (sku) {
          return sku.isPrime === true;
        }
      );
      console.log("this.chooseSKU", this.chooseSKU)
    }
  },

  computed: {
    deliverTime() {
      if (this.chooseSKU.deliverTime === 1) {

        return "现货下单立即配送"
      }
      if (this.chooseSKU.deliverTime === 2) {
        return "最早今天19:00配送"
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
    color: #888888;
  }

  .cart-pop-container {
    position: relative;
  .van-popup__panel {
    height: 100%;
    width: 100%;
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
  .van-popup__panel_price:after {
    content:" ";
    display:block;
    margin:5px auto 0;
    width:90%;
    border-bottom:2px solid #F39B00;
    transition:width .4s ease-in-out;
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
    .van-popup__panel_extro__item {
      box-sizing: border-box;
      flex: 0 0 50%;
      padding: 5px 5px;
      font-size: 16px;
      font-family: "Microsoft YaHei";
    }
  }
  .van-popup__panel_shopcart {
    width: 100%;
  }
  }
  }

</style>

<style lang="scss">
  .button-custom {
    width: 100%;
  }

</style>
