<template>
  <div class="cart-pop-container">
    <van-popup :position="position"
               :show="popShow"
               z-index="200"
               custom-style="left:20%"
               @close="popUpClose"
               :overlay="true">
      <div class="van-popup__panel">
        <div class="van-popup__panel_price">
          {{chooseSKU.salePrice}}
        </div>
        <div class="van-popup__panel_line">
        </div>
        <div class="van-popup__panel_extro">
          <van-icon name="fire-o"/>
          <span class="van-popup__panel_extro__item">{{chooseSKU.cakeSize}}</span>
          <van-icon name="fire-o"/>
          <span class="van-popup__panel_extro__item">{{chooseSKU.capacity}}</span>
          <div></div>
          <van-icon name="fire-o"/>
          <span class="van-popup__panel_extro__item">{{chooseSKU.copies}}</span>
          <van-icon name="fire-o"/>
          <span class="van-popup__panel_extro__item">{{chooseSKU.cutlery}}</span>
        </div>
        <div class="van-popup__panel_attribute">
          <div>规格：</div>
          <span v-for="(item, index) in productSKUs" :key="index">
              <van-button :id="item.id"
                          :type="item.id === chooseSKU.id ? 'primary' : 'default'"
                          size="mini" @click="selectedSKU">{{item.attributeName}}</van-button>
            </span>
        </div>
        <div class="van-popup__panel_shopcart">
          <van-button type="warning" @click="addToStorage">
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
    productSKUs: Array,
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
      chooseSKU: {}

    }
  },

  watch: {
    productSKUs() {
      this.chooseSKU = this.chooseSKU = this.productSKUs.find(
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
    addToStorage() {
      wx.setStorage(
        {
         key:"chooseSKU",
         data:this.chooseSKU
        }
      ),
      this.$emit('setStorage', this.chooseSKU);
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
    padding-left: 10px;
    padding-bottom: 10px;
    padding-top: 10px;
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
    padding: 10px 10px;
    .van-popup__panel_extro__item {
      padding: 10px 10px;
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
