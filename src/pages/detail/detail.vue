<template>
  <div class="zm-goods__container">
    <div class="zm-goods__head">
      <img :src="good.headPicUrl" mode="scaleToFill" style="width: 100%; height: 300px">
      <div style="position: relative">
        <div class="zm-goods__name">{{good.name}}</div>
        <div class="zm-goods__price">
          <span class="zm-goods__price-value">{{good.salePrice}}</span>
          <span class="zm-goods__price-lineprice">{{good.linePrice}}</span>
          <span class="zm-goods__price-tag">
            <van-tag type="success">限时折扣</van-tag>
          </span>
        </div>
        <div class="zm-goods__share">
          <div>
            <van-icon custom-style="{color:#CFD4DA}"	name="share"></van-icon>
          </div>
          <div style="font-size: 12px; color: #CFD4DA">
            分享
          </div>
        </div>
      </div>
        <van-cell custom-class="demo"
                  title="会员5张9折券，本次至少可省￥13.80" link-type="navigateTo"
                  url="/pages/myvip/main" is-link value="立即开通" />
    </div>
    <div class="zm-goods__extroInfo">
      <div class="choose-attribute">
        <van-cell :title="attribute" custom-class="cell-custom-class" is-link @click="chooseAttributes" />
      </div>
      <div class="attribute-extro-info">
        <div class="extro-info__item">
          <van-icon name="fire-o"/>
          <span>{{chooseSKU.cakeSize}}</span>
        </div>
        <div class="extro-info__item">
          <van-icon name="fire-o"/>
          <span>{{chooseSKU.capacity}}</span>
        </div>
        <div class="extro-info__item">
          <van-icon name="fire-o"/>
          <span>{{chooseSKU.copies}}</span>
        </div>
        <div class="extro-info__item">
          <van-icon name="fire-o"/>
          <span>{{chooseSKU.cutlery}}</span>
        </div>
      </div>
      <div class="product-extro-info">
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
      </div>
    </div>
    <div class="zm-goods__content">
      <van-tabs :active= "active" animated swipeable sticky @change="onChange">
        <van-tab title="详情">
          <div class="zm-goods__detail">
            <!--如何消除图片与图片间的空隙-->
            <div>
              <image :src="urls.firstUrl" mode="widthFix" class="zm-goods__detail-img"></image>
            </div>
            <div v-if="urls.secondUrl">
              <image :src="urls.secondUrl" mode="widthFix" class="zm-goods__detail-img"></image>
            </div>
            <div>
              <image :src="urls.firstUrl" mode="widthFix" class="zm-goods__detail-img"></image>
            </div>
            <div>
              <image :src="urls.firstUrl" mode="widthFix" class="zm-goods__detail-img"></image>
            </div>
            <div>
              <image :src="urls.firstUrl" mode="widthFix" class="zm-goods__detail-img"></image>
            </div>
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
    <div class="zm-goods__review">
      <van-cell :title="reviewTitle" is-link
                link-type="navigateTo"
                url="/pages/comments/main"
                value="查看全部"
                value-class="zm-goods__review_value" />
      <div class="zm-goods__review_detail">
        <img :src="comment.url" class="avatar-img">
        <div style="width: 60%;">
          <div style="background-color: #CFD4DA">
            {{comment.content}}
          </div>
        </div>
      </div>
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
              @click="addCart"
            />
          </van-goods-action>
        </div>
      </div>

    </van-popup>

  </div>
</template>

<script>

  import {GET_PRODUCT_DETAIL_BY_ID, GET_PRODUCT_SKU_DETAIL_BY_ID } from '@/utils/api';
  import {request} from "@/utils/request";

  import { mapState, mapMutations, mapActions } from 'vuex';
  import { ADD_PRODUCT_TO_CART } from '@/store/mutation-types';

  export default {
  data() {
    return {
      active: 0,
      good: {
        "id": 1,
        "categoryId": 38,
        "productAttributeGroupId": 1,
        "name": "小米蛋糕",
        "englishName": "xiaomi cake",
        "sort": 1,
        //type(1 cake、2 free 3 other)
        "type":1,
        "stock": 100,
        "onlineStatus": 1001,
        "salePrice": 150.0,
        "linePrice": 160.0,
        "headPicUrl": "http://yangliuyi.oss-cn-shanghai.aliyuncs.com/zhimu/images/20190816/2020851887机器猫.jpg",
        "detailPicUrl": "{\"firstUrl\":\"http://yangliuyi.oss-cn-shanghai.aliyuncs.com/zhimu/images/20190816/机器猫.jpg\"}",
        "deliverTime": "当日配送",
        "freshCondition": "常温保存",
        "sweetLevel": 1,
        "ingredients": "测试商品配料，花生",
        "createTime": "2019-08-16T05:37:53.000+0000",
        "updateTime": null
      },
      popShow:false,
      urls: {"firstUrl":"http://yangliuyi.oss-cn-shanghai.aliyuncs.com/zhimu/images/20190816/机器猫.jpg"},
      productSKUs: [
        {
          "id": 10,
          "productId": 3,
          "productAttributeId": 6,
          "salePrice": 111.0,
          "linePrice": 132.0,
          "isPrime": true,
          "cakeSize": "7* 12cm",
          "capacity": "1000ml",
          "copies": "5人份",
          "cutlery": "18人餐具",
          "createTime": null,
          "updateTime": null,
          "attributeName": "1磅",
          "attributeOrderNum": 1
        }
      ],
      chooseSKU :{
        "id": 10,
        "productId": 3,
        "productAttributeId": 6,
        "salePrice": 111.0,
        "linePrice": 132.0,
        "isPrime": true,
        "cakeSize": "7* 12cm",
        "capacity": "1000ml",
        "copies": "5人份",
        "cutlery": "18人餐具",
        "createTime": null,
        "updateTime": null,
        "attributeName": "1磅",
        "attributeOrderNum": 1
      },
      popupText: "加入购物车",
      comment: {
        url:"http://pic4.zhimg.com/50/v2-8fdee93e812b539c2b88cacce3007a94_hd.jpg",
        content:"必吃榜来拔草啦~嘉善必吃榜来拔草啦~嘉善必吃榜来拔草啦~嘉善必吃榜来拔草啦~嘉善"
      }
    }
  },
  //如何支持pathVariable 的请求？？
  methods: {

    ...mapActions(
      [
        'addProductToCart'
      ]

    ),

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
    addCart() {
      let cartProduct = {
        skuId : this.chooseSKU.id,
        url : this.good.headPicUrl,
        productId : this.chooseSKU.productId,
        attributeName : this.chooseSKU.attributeName,
        productName: this.good.name,
        type : this.good.type,
        salePrice: this.chooseSKU.salePrice,
        linePrice: this.chooseSKU.linePrice
      }

      this.addProductToCart(cartProduct);
      console.log(cartProduct)
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
          this.urls = JSON.parse(this.good.detailPicUrl)
        }
      )
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
          // this.getProductDetail(params);
          // this.getProductSkuDetail(params);

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

  .zm-goods__detail {
    font-size: 0;
    margin:0;
    padding:0;
  }
  .zm-goods__detail-img {
    width: 100%;
  }

  .zm-goods__review_detail {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .avatar-img {
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }

  .attribute-extro-info {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    background-color:white;
  .extro-info__item {
    box-sizing: border-box;
    flex: 0 0 50%;
    padding: 5px 5px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
  }
  }
  .attribute-extro-info:after {
    content:" ";
    display:block;
    margin:5px auto 0;
    width:90%;
    border-bottom:2px solid #F39B00;
    transition:width .4s ease-in-out;
  }

  .zm-goods__extroInfo {
    margin: 5px 10px;
  }
  .zm-goods__price-value {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    padding-right: 5px;
  }
  .zm-goods__price-value:before {
    content:'￥';
    font-size: small;
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

  .zm-goods__container {
    position: relative;
    overflow: hidden;
    padding-bottom:60px;
  .zm-goods__head {
    position: relative;
  .zm-goods__name {
    font-size: 16px;
    margin: 5px 0;
    text-align: left;
  }
  .zm-goods__share {
    position: absolute;
    right: 10px;
    top: 0px;
  }
  .zm-goods__price {
    margin: 5px 0;
    text-align: left;
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
<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>

<style lang="scss">
  .cell-custom-class {
    background-color: #E8EDF5 !important;
  }
</style>
