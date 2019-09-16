<template>
  <div class="cart-pop-container">
    <van-popup :position="position"
               :show="popShow"
               z-index="200"
               custom-style="left:20%"
               @close="popUpClose"
               >
      <div class="van-popup__panel">
        <div style="padding-left: 10%">
          <div class="van-popup__panel_price">
            {{chooseSKU.salePrice}}
          </div>
          <div class="van-popup__panel_extro">
            <div class="van-popup__panel_extro__item">
              <van-icon name="fire-o"/>
              <span>{{chooseSKU.cakeSize}}</span>
            </div>
            <div class="van-popup__panel_extro__item">
              <van-icon name="fire-o"/>
              <span>{{chooseSKU.capacity}}</span>
            </div>
            <div class="van-popup__panel_extro__item">
              <van-icon name="fire-o"/>
              <span>{{chooseSKU.copies}}</span>
            </div>
            <div class="van-popup__panel_extro__item">
              <van-icon name="fire-o"/>
              <span>{{chooseSKU.cutlery}}</span>
            </div>
          </div>
          <div style="font-family: 'Microsoft YaHei'; font-size: 14px;padding:10px 0px;">规格</div>
          <div class="van-popup__panel_attribute">
          <span v-for="(item, index) in productSKUs.pmsProductSkuList" :key="index">
              <van-button :id="item.id"
                          :type="item.id === chooseSKU.id ? 'primary' : 'default'"
                          size="mini" @click="selectedSKU">{{item.attributeName}}</van-button>
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
export default {
  name: 'cart-pop',
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
      chooseSKU: {

      }

    }
  },

  watch: {
    productSKUs() {
      this.chooseSKU = this.productSKUs.pmsProductSkuList.find(
        function (sku) {
          return sku.isPrime === true;
        }
      );
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .cart-pop-container {
    position: relative;
  .van-popup__panel {
    height: 240px;
    width: 280px;
  .van-popup__panel_price {
    padding-bottom: 10px;
    padding-top: 10px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: bold;
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
    position: absolute;
    bottom:0;
    width: 280px;
  }
  }
  }

</style>

<style lang="scss">
  .button-custom {
    width: 100%;
  }
</style>
