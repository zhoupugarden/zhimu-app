<template>
  <div class="zm-goods__container">
    <div class="zm-goods__head">
      <img :src="productInfo.headPicUrl" mode="scaleToFill" style="width: 100%; height: 300px">
      <div style="position: relative; padding-left: 10px;">
        <div class="zm-goods__name">{{productInfo.name}}</div>
        <div class="zm-goods__price">
          <span class="zm-goods__price-value">{{chooseSKU.salePrice}}</span>
          <span v-show="productInfo.promoteType===1004" class="zm-goods__price-lineprice">{{chooseSKU.linePrice}}</span>
          <span v-show="productInfo.promoteType !== 1001" class="zm-goods__price-tag">
            <van-tag type="success">{{promoteTag}}</van-tag>
          </span>
        </div>
        <div class="zm-goods__share">
          <div style="font-size: 12px; color: white">
            <button size="mini" open-type='share'>
              <img src="../../asset/share.png" style="width: 20px;height: 20px">
              <div>
                分享
              </div>
            </button>
          </div>
        </div>
      </div>
      <div @click="navigateToBuyVip" v-if="isVip !== 1" class="vip_tip_class">
        <div style="font-size: 12px;">
          {{vipTip}}
        </div>
        <div style="display: flex;">
          <span style="font-size: 12px;">立即开通</span>
          <span>
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
    </div>
    <div class="zm-goods__extroInfo">
      <div class="choose-attribute">
        <van-cell :title="attribute" custom-class ="choose-attribute-class" title-class="cell-title-class" is-link @click="chooseAttributes" />
      </div>
      <div class="attribute-extro-info">
        <div v-show="chooseSKU.cakeSize" class="extro-info__item">
          <div class="extro-info__item_i">
            <img src="../../asset/cake_2.png" style="width: 20px; height: 20px; ">
            <span class="font_setting">{{chooseSKU.cakeSize}}</span>
          </div>
        </div>
        <div v-show="chooseSKU.capacity" class="extro-info__item">
          <div class="extro-info__item_i">
            <img src="../../asset/people.png" style="width: 20px; height: 20px; ">
            <span class="font_setting">{{chooseSKU.capacity}}</span>
          </div>
        </div>
        <div v-show="chooseSKU.copies" class="extro-info__item">
          <div class="extro-info__item_i">
            <img src="../../asset/people.png" style="width: 20px; height: 20px; ">
            <span class="font_setting">{{chooseSKU.copies}}</span>
          </div>
        </div>
        <div v-show="chooseSKU.cutlery" class="extro-info__item">
          <div class="extro-info__item_i">
            <img src="../../asset/cutlery.png" style="width: 20px; height: 20px; ">
            <span class="font_setting">{{cutlery}}</span>
          </div>

        </div>
        <div v-show="deliverTime" class="extro-info__item">
          <div class="extro-info__item_i">
            <img src="../../asset/time.png" style="width: 20px; height: 20px; ">
            <span class="font_setting">{{deliverTime}}</span>
          </div>

        </div>
      </div>
      <div class="product-extro-info">
        <van-cell>
          <div class="zm-goods__sweet">
            <span style="float: left; font-size: 12px;">参考甜度：</span>
            <span style="float: left">
              <van-rate name="甜度"
                        readonly
                        size="12"
                        allow-half
                        void-color="#eee"
                        icon="like"
                        void-icon="like-o"
                        :value="productInfo.sweetLevel"
              />
            </span>
          </div>
        </van-cell>
        <van-cell>
          <div class="zm-goods__fresh">
            <span style="float: left; font-size: 12px;">保鲜条件：</span>
            <span style="float: left; font-size: 12px;">{{productInfo.freshCondition}}</span>
          </div>
        </van-cell>
      </div>
    </div>
    <div class="zm-goods__content">
      <van-tabs :active= "active" animated swipeable sticky @change="onChange">
        <van-tab title="详情">
          <div class="zm-goods__detail">
            <!--如何消除图片与图片间的空隙-->
            <div v-for="item in urls">
              <image :src="item" mode="widthFix" class="zm-goods__detail-img"></image>
            </div>
          </div>
        </van-tab>
        <van-tab title="原料">
          <div class="zm-goods__ingredients">
            <span class="zm-goods__ingredients__content">{{productInfo.ingredients}}</span>
          </div>
        </van-tab>
        </van-tab>
        <van-tab title="须知">
          <div class="zm-goods__notice">
            <div style="font-weight: bold; font-size: 13px; padding: 10px 0px;">
              请至少5小时预订
            </div>
            <div style="font-size: 12px;">
              为确保蛋糕的健康新鲜，以及送达您手中时处于最佳使用状态，每一个蛋糕均严格按照配送时间新鲜现做，
              及时送达，绝无库存，请提前4-6小时预订
            </div>
            <div style="font-weight: bold; font-size: 13px; padding: 10px 0px;">
              订购流程
            </div>
            <div style="display: flex;justify-content: space-around;align-items: center;">
              <div>
                <img src="../../asset/detail/phone.png" style="width: 20px; height: 20px;padding-left: 15px ">
                <div style="font-size: 12px;">顾客下单</div>
              </div>
              <van-icon name="arrow" />
              <div>
                <img src="../../asset/detail/customer.png" style="width: 20px; height: 20px;padding-left: 15px ">
                <div style="font-size: 12px;">客服接单</div>
              </div>
              <van-icon name="arrow" />
              <div>
                <img src="../../asset/detail/make.png" style="width: 20px; height: 20px;padding-left: 15px ">
                <div style="font-size: 12px;">按单鲜制</div>
              </div>
              <van-icon name="arrow" />
              <div>
                <img src="../../asset/detail/deliver.png" style="width: 20px; height: 20px; padding-left: 15px">
                <div style="font-size: 12px;">冷链配送</div>
              </div>
            </div>
            <div style="font-weight: bold; font-size: 13px; padding: 10px 0px;">
              订单签收
            </div>
            <div style="font-size: 12px;">
              请您确认蛋糕款式、尺寸无误，且蛋糕完好后签收，如有疑问或损失请当场与配送员核实，并联系我们，
              订单一经签收即表示您对产品信息及完整性确认无误，如有疑问请联系 138-1740-9664。
            </div>
            <div style="font-weight: bold; font-size: 13px; padding: 10px 0px;">
              投诉建议
            </div>
            <div style="font-size: 12px;">
              如有任何投诉建议，承诺24小时内进行回复及处理。以下情况，不作为投诉处理：
              <ul>
                <li>1. 因个人主观喜欢或口感对产品有异议造成的投诉；</li>
                <li>2. 因顾客签收后产品发生破损、融化等相关问题；</li>
                <li>3. 因不可抗拒因素造成的配送延误问题；</li>
              </ul>
              （高峰时段的交通堵塞，大雨大雪等恶劣天气）
            </div>

          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="zm-goods__review">
      <van-cell title="用户评价" is-link
                link-type="navigateTo"
                :url="commentUrl"
                value="查看全部"
                value-class="zm-goods__review_value" />
      <div v-if="starCommentInfo" class="zm-goods__review_detail">
        <img :src="starCommentInfo.avatarUrl" class="avatar-img">
        <div style="width: 60%;">
          <div class="star_comment">
            {{starCommentInfo.commentContent}}
          </div>
        </div>
      </div>
      <div v-else style="background-color: white; text-align: center; font-size: 12px; padding: 10px;">
        暂无评价
      </div>
    </div>
    <div class="zm-goods__actions">
      <van-goods-action>
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :info="cartTotalCount"
          @click="onClickCartIcon"
        />
        <van-goods-action-button
          text="加入购物车"
          plain
          type="warning"
          @click="onAddCartButton"
        />
        <van-goods-action-button
          text="立即购买"
          plain
          @click="onBuyClickButton"
        />
      </van-goods-action>
    </div>
    <van-popup position="bottom"
               :show="popShow"
               z-index="200"
               custom-style=" top:50%;"
               @close="popUpClose"
               :overlay="true">
      <div class="van-popup__panel">
        <div style="display: flex; align-items: center;padding: 20px 0px; border-bottom: 1px solid #f2f2f2;">
          <div class="van-popup__panel_price">
            <span>
              {{chooseSKU.salePrice}}
            </span>
            <span v-show="chooseSKU.promoteType===1004" class="zm-goods__price-lineprice">
              {{chooseSKU.linePrice}}
            </span>
          </div>
          <span v-if="productInfo.stock <= productInfo.warnStock" style="color: red; font-size: 12px; padding-left: 10px;">少量库存</span>
        </div>
        <div class="van-popup__panel_extro">
          <div v-show="chooseSKU.cakeSize" class="van-popup__panel_extro__item">
            <div class="extro-info__item_i">
              <img src="../../asset/size.png" style="width: 20px; height: 20px; ">
              <span class="font_setting">{{chooseSKU.cakeSize}}</span>
            </div>
          </div>
          <div v-show="chooseSKU.capacity" class="van-popup__panel_extro__item">
            <div class="extro-info__item_i">
              <img src="../../asset/people.png" style="width: 20px; height: 20px; ">
              <span class="font_setting">{{chooseSKU.capacity}}</span>
            </div>
          </div>
          <div v-show="chooseSKU.copies" class="van-popup__panel_extro__item">
            <div class="extro-info__item_i">
              <img src="../../asset/time.png" style="width: 20px; height: 20px; ">
              <span class="font_setting">{{chooseSKU.copies}}</span>
            </div>
          </div>
          <div v-show="chooseSKU.cutlery" class="van-popup__panel_extro__item">
            <div class="extro-info__item_i">
              <img src="../../asset/cutlery.png" style="width: 20px; height: 20px; ">
              <span class="font_setting">{{cutlery}}</span>
            </div>
          </div>

          <div v-show="chooseSKU.deliverTime" class="van-popup__panel_extro__item">
            <div class="extro-info__item_i">
              <img src="../../asset/cutlery.png" style="width: 20px; height: 20px; ">
              <span class="font_setting">{{deliverTime}}</span>
            </div>

          </div>
        </div>
        <div style=" font-size: 14px; padding: 20px 0px;">规格</div>
        <div class="van-popup__panel_attribute">
          <span style="margin-right: 5px;" v-for="(item, index) in productSKUs" :key="index">
           <check-box
            :skuItem="item"
            :type="item.skuId === chooseSKU.skuId ? 'selected' : 'default'"
            @selectedSKU="selectedSKU"
          ></check-box>

          </span>
        </div>
        <div v-if= "popupText === '加入购物车' " class="van-popup__panel_shopcart">
          <van-goods-action>
            <van-goods-action-button
              :text="popupText"
              type="warning"
              @click="addCart"
            />
          </van-goods-action>
        </div>
        <div v-else class="van-popup__panel_shopcart">
          <van-goods-action>
            <van-goods-action-button
              :text="popupText"
              type="warning"
              @click="addToBuy"
            />
          </van-goods-action>
        </div>
      </div>
    </van-popup>

    <van-toast  id="van-toast"/>
  </div>
</template>

<script>
  import {GET_PRODUCT_DETAIL_BY_ID, PRODUCT_NOTICE } from '@/utils/api';
  import {request} from "@/utils/request";
  import { mapGetters, mapActions } from 'vuex';
  import { ADD_PRODUCT_TO_CART } from '@/store/mutation-types';
  import CheckBox from '@/components/CheckBox';
  import {toast} from '../../utils/toast';
  import {subscribeMessage} from '@/utils/wxApi';

  export default {
    components: {
      CheckBox
    },
  data() {
    return {
      active: 0,
      good: {
      },
      productInfo: {},
      starCommentInfo:{},
      popShow:false,
      outShowUp:false,
      urls: [],
      productSKUs: [],
      chooseSKU :{},
      popupText: "加入购物车",
      comment: null,
      commentContent:"",
      commentUrl:"",
      phoneNo:"",
      isNoticed:false,
    }
  },
  //如何支持pathVariable 的请求？？
  methods: {
    ...mapActions(
      [
        'addProductToCart'
      ]
    ),
    selectedSKU(id) {
      console.log("selectedSKU: ", id);
      this.chooseSKU = this.productSKUs.find(
        function (sku) {
          return sku.skuId === id;
        }
      );
      console.log("this.chooseSKU :", this.chooseSKU);
      console.log("this.productSKUs :", this.productSKUs);
    },

    addCart() {
      console.log("addCart====")
      let that = this;
      if (!this.online) {
        this.popShow = false;
        //   弹起到货提醒的订阅

        let that = this;
        let id = 'By9NVDZM5spRmqLOVnHtBG1CooMzmh3g0ds48Oic4W0';
        let tmplIds = [];
        tmplIds.push(id);
        subscribeMessage(tmplIds,  (res)=> {
          console.log("res===========",res);
          that.addProductNotice();
        });

      }else {
        this.addProductToCart(this.chooseSKU);
        this.popShow = false;
        toast("成功添加购物车");
      }
    },
    onClickCartIcon() {
      //调不到bar关联的菜单
      var url = "../cart/main";
      wx.switchTab({
        url
      });
    },
    onAddCartButton() {
      if (this.productInfo.stock > 0) {
        this.popupText = "加入购物车";
     }else {
        this.popupText = "到货通知";
      }
      this.popShow = true;
    },
    addToBuy() {
      this.popShow = false;
      let that = this;
      if (!this.online)  {
      //   弹起到货提醒的页面
        let that = this;
        let id = 'By9NVDZM5spRmqLOVnHtBG1CooMzmh3g0ds48Oic4W0';
        let tmplIds = [];
        tmplIds.push(id);
        subscribeMessage(tmplIds,  (res)=> {
          console.log("res===========",res);
          that.addProductNotice();
        });

      }else {
        this.addProductToCart(this.chooseSKU);
        this.popShow = false;
        var url = "../cart/main";
        wx.switchTab({
          url
        });
      }
    },
    navigateToBuyVip() {
      var url = "/pages/buyvip/main";
      console.log("url",url)
      wx.navigateTo({
        url
      });
    },

    onBuyClickButton() {
      if (this.online) {
        this.popupText = "立即购买";
      }else {
        this.popupText = "到货通知";
      }
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
          this.productInfo = response.productDto;
          this.starCommentInfo = response.starCommentDto;
          this.productSKUs = response.skuDtoList;
          this.chooseSKU = this.productSKUs[0];
          wx.setNavigationBarTitle({
            title: this.productInfo.name
          });
          this.urls = JSON.parse(this.productInfo.detailPicUrl);
        }
      )
    },
    chooseAttributes() {
      this.popShow = true;
    },
    popUpClose() {
      this.popShow = false;
    },

    phoneNoChange(event) {
      this.phoneNo = event.mp.detail;
    },

    outShowClose() {
      this.outShowUp = false;
    },

    addProductNotice() {
      let params = {};
      params.productId = this.productInfo.id;
      request(
        PRODUCT_NOTICE,
        'POST',
        params
      ).then(
        (response) => {
          if (response.isRepeated === 1) {
            toast("您已订阅, 有货时我们将为您发送到货提醒通知", 3000)
          } else {
            this.isNoticed = true;
            toast("商品到货提醒订阅成功");
          }
        }
      )
    }
  },
    onShareAppMessage(res) {
      if (res.from === 'button') {
        console.log(res.target)
      }
      return {
        title: this.productInfo.name,
        path:'/page/detail/main?productId='+this.productInfo.id,
        desc: this.productInfo.name
      }
    },

    onShow() {
          let params = {};
          params.productId = this.$root.$mp.query.productId;
          //后续可以将这两个请求合并成一个
          this.getProductDetail(params);
          this.commentUrl = "/pages/comments/main?productId=" + this.$root.$mp.query.productId;

      //    将数据还原，后续用Obejct.assign
      this.popShow = false;
      this.outShowUp = false;
      this.phoneNo = "";
      this.isNoticed = false;

      },
    computed: {
      online() {
        if (this.productInfo.onlineStatus === 1001 && this.productInfo.stock > 0) {
          return true;
        }else {
          return false;
        }
      },

      promoteTag() {
        switch(this.productInfo.promoteType) {
          case 1001:
            return "";
          case 1002:
            return "买一送一";
          case 1003:
            return "第二件半价";
          case 1004:
            return "限时促销";
        }
      },

      attribute() {
        return "已选择：" + this.chooseSKU.attributeValue +  this.chooseSKU.attributeName;
      },
      vipTip() {
        let freeAmount = this.chooseSKU.salePrice * 0.1;
        return "会员5张9折券，本次至少可省￥" + freeAmount.toFixed(2);
      },
      content() {
        if (this.isNoticed) {
          return "订阅成功," + this.productInfo.name + "有货时我们将给您发送通知";
        }else {
          return "您希望在" + this.productInfo.name + "有货时收到通知么?";
        }
      },
      deliverTime() {
        let hour = this.chooseSKU.deliverTime;
        if (this.chooseSKU.deliverTime === 1001 || this.chooseSKU.deliverTime === 1002) {
          return "现货下单立即配送";
        } else {
          // 如果跨夜统一为第二天营业时间配送
          return "最早明天10点可配送";
        };
      },
      cutlery() {
        return "含" + this.chooseSKU.cutlery + "套餐具";
      },
      ...mapGetters(
        [
          'cartTotalCount','isVip'
        ]
      )

    }
}
</script>


<style lang="scss" scoped>
  @import "detail.scss";
  .van-popup__panel {
    width: 90%;
    margin: 0 auto;
  }

</style>
<style lang="scss">

  .icon-class {
    background-color: #000000;
  }
  .button-custom-class{
    font-size:100px;
  }

  .cell-title-class {
    font-size: 12px !important;
  }
  .choose-attribute-class {
    background-color: #e2e2e2 !important;
  }

  .button-custom {
    width: 100%;
  }
  .zm-goods__review {
    background-color: white;
  }
  .demo {
    background-color: #ffc95f !important;
    font-size: 8px !important;
    margin-right: 10px !important;
  }
  .zm-goods__ingredients {
    position:relative;
    margin:10px;

  .zm-goods__ingredients__content {
    position: relative;
    font-size: 13px;
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
    background-color:#f2f2f2 !important;
  }
</style>

