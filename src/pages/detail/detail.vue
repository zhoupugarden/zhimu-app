<template>
  <div class="zm-goods__container">
    <div class="zm-goods__head">
      <img :src="urls.headUrl" mode="aspectFill">
      <van-cell-group>
        <van-cell>
          <div class="zm-goods__name">{{good.name}}</div>
          <div class="zm-goods__price">{{'￥' + good.linePrice}}</div>
        </van-cell>
        <van-cell custom-class="demo"
                  title="会员5张9折券，本次至少可省￥13.80"  is-link value="立即开通" />
      </van-cell-group>
    </div>
    <div class="zm-goods__extroInfo">
      <van-cell-group>
        <van-cell :title="attribute" is-link @click="chooseAttributes" />
        <van-cell>
          <div class="zm-goods__skuExtroInfo">
          </div>
        </van-cell>
        <van-cell>
          <div class="zm-goods__sweet">
            <span style="float: left">参考甜度：</span>
            <span style="float: left">
              <van-rate name="甜度"
                        readonly
                        size="15"
                        icon="like"
                        void-icon="like-o"
                        :value="good.sweetLevel"
              />
            </span>
          </div>
        </van-cell>
        <van-cell>
          <div class="zm-goods__fresh">
            <span style="float: left">保鲜条件：</span>
            <span style="float: left">{{good.freshCondition}}</span>
          </div>
        </van-cell>
      </van-cell-group>
      <van-popup position="bottom"
                 :show="popShow"
                 z-index="200"
                 custom-style=" top:60%;"
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
            <span>{{chooseSKU.cakeSize}}</span>
            <van-icon name="fire-o"/>
            <span>{{chooseSKU.capacity}}</span>
            <van-icon name="fire-o"/>
            <span>{{chooseSKU.copies}}</span>
            <van-icon name="fire-o"/>
            <span>{{chooseSKU.cutlery}}</span>
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
            <van-goods-action>
              <van-goods-action-button
                :text="popupText"
                type="warning"
                bind:click="onClickButton"
              />
            </van-goods-action>
          </div>
        </div>

      </van-popup>
    </div>
    <div class="zm-goods__review">
      <van-cell :title="reviewTitle" is-link value="查看全部"
                value-class="zm-goods__review_value" @click="navigateToReviewDetail"/>
      <div class="zm-goods__review_detail">
        这个商品棒极了
      </div>
    </div>

    <div class="zm-goods__content">
      <van-tabs :active= "active" animated swipeable sticky @change="onChange">
        <van-tab title="详情">
          <div class="zm-goods__detail">
            <!--如何消除图片与图片间的空隙-->
           <img :src="urls.firstUrl" mode="aspectFill"><img :src="urls.secondUrl" mode="aspectFill">
            <img :src="urls.thirdUrl" mode="aspectFill">
           <img :src="urls.fourUrl" mode="aspectFill">
           <img :src="urls.fiveUrl" mode="aspectFill">
          </div>
        </van-tab>
        <van-tab title="原料">
          <div class="zm-goods__ingredients">
            <span class="zm-goods__ingredients__content">{{good.ingredients}}</span>
          </div>
        </van-tab>
        </van-tab>
        <van-tab title="须知">
          <div class="zm-goods__notice">
            注意事项
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="zm-goods__actions">

      <van-goods-action>
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          bind:click="onClickIcon"
        />
        <van-goods-action-button
          text="加入购物车"
          type="warning"
          @click="onClickButton"
        />
        <van-goods-action-button
          text="立即购买"
          @click="onBuyClickButton"
        />
      </van-goods-action>
    </div>
  </div>
</template>

<script>

  import {GET_PRODUCT_DETAIL_BY_ID, GET_PRODUCT_SKU_DETAIL_BY_ID } from '@/utils/api';
  import {request} from "@/utils/request";

  export default {
  data() {
    return {
      active: 0,
      good: {},
      popShow:false,
      urls: {},
      productSKUs: [],
      chooseSKU :{},
      popupText: "加入购物车"
    }
  },
  //如何支持pathVariable 的请求？？
  methods: {
    selectedSKU(item) {
      console.log("selectedSKU: ", item);
      let id = parseInt(item.mp.currentTarget.id);
      console.log("id", id);
      this.chooseSKU = this.productSKUs.find(
        function (sku) {
          console.log("sku.id", sku.id, "id", id);
          return sku.id === id;
        }
      );
      console.log("this.chooseSKU :", this.chooseSKU);

    },

    onClickButton() {
      this.popShow = true;
    },
    onBuyClickButton() {
      this.popupText = "立即购买";
      this.popShow = true;
    },

     getProductDetail(data) {
      request(
        GET_PRODUCT_DETAIL_BY_ID,
        'GET',
        data
      ).then(
        (response) => {
          this.good = response;
          console.log("this.good response", this.good);
          wx.setNavigationBarTitle({
            title: this.good.name
          });
          this.urls = JSON.parse(this.good.picUrls)
        }
      )
    },

    navigateToReviewDetail() {
       console.log("navigateToReviewDetail")
    },

    getProductSkuDetail(data) {
      request(
        GET_PRODUCT_SKU_DETAIL_BY_ID,
        'GET',
        data
      ).then(
        (response) => {
          this.productSKUs = response;
          console.log("this.good productSKUs response", this.productSKUs);

          this.chooseSKU = this.productSKUs.find(
            function (sku) {
              return sku.isPrime === true;
            }
          );
          console.log("chooseSKU", this.chooseSKU);
        }
      )
    },
    chooseAttributes() {
      console.log("chooseAttributes");
      this.popShow = true;
    },
    popUpClose() {
      console.log("popUpClose");
      this.popShow = false;
    }
  },
    mounted() {
      console.log(this.$root.$mp.query);
        let params = {};
          params.productId = this.$root.$mp.query.productId;
          //后续可以将这两个请求合并成一个
          this.getProductDetail(params);
          this.getProductSkuDetail(params);

      },
    computed: {
      attribute() {
        return "已选择：" + this.chooseSKU.attributeName;
      },
      reviewTitle() {
        return "评价" + "(" + this.active + ")";
      }

    }
}
</script>


<style lang="scss"  scoped>
  .zm-goods__container {
    position: relative;
    background-color: #E8EDF5;
    margin-top: 10px;
    overflow: hidden;
  .zm-goods__head {
    position: relative;
  .zm-goods__name {
    font-size: 16px;
    margin: 15px 0;
    text-align: left;
  }
  .zm-goods__price {
    margin: 15px 0;
    text-align: left;
    color: red;
  }
  .zm-goods__link  {
    background-color: red;
  }
  }
  .zm-goods__content {
    margin-top: 15px;
    margin-bottom: 15px;
  .zm-goods__detail {
    position:relative;
  .zm-goods__ingredients {
    position:relative;
    width:80px;
    margin:80px;
  .zm-goods__ingredients__content {
    position: absolute;
    width: 80px;
  }
  }
  }
  }

  }
</style>
<style lang="scss">
  .demo {
    background-color: #ffc95f !important;
    font-size: 8px !important;
    margin-right: 10px !important;
  }
  .zm-goods__ingredients {
    position:relative;
    width:80px;
    margin:80px;
  .zm-goods__ingredients__content {
    position: relative;
    width: 80px;
  }
  }
  .zm-goods__review_value {
    font-size: small;
    color: red !important;
  }
  .zm-goods__actions {
    position: fixed;
    bottom: 0;
    z-index: 100;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .van-popup__panel_line {
    width:80%;
    margin:0 auto;
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }


</style>

