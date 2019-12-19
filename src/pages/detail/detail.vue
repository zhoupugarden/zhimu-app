<template>
  <div class="zm-goods__container">
    <div class="zm-goods__head">
      <img :src="good.headPicUrl" mode="scaleToFill" style="width: 100%; height: 300px">
      <div style="position: relative; padding-left: 10px;">
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
            <img src="../../asset/share.png" style="width: 20px;height: 20px">
          </div>
          <div style="font-size: 12px; color: white">
            <button size="mini"  open-type='share'>分享</button>
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
        <div class="extro-info__item">
          <div class="extro-info__item_i">
            <img src="../../asset/cake_2.png" style="width: 20px; height: 20px; ">
            <span class="font_setting">{{chooseSKU.cakeSize}}</span>
          </div>
        </div>
        <div class="extro-info__item">
          <div class="extro-info__item_i">
            <img src="../../asset/people.png" style="width: 20px; height: 20px; ">
            <span class="font_setting">{{chooseSKU.capacity}}</span>
          </div>
        </div>
        <div class="extro-info__item">
          <div class="extro-info__item_i">
            <img src="../../asset/people.png" style="width: 20px; height: 20px; ">
            <span class="font_setting">{{chooseSKU.copies}}</span>
          </div>
        </div>
        <div class="extro-info__item">
          <div class="extro-info__item_i">
            <img src="../../asset/cutlery.png" style="width: 20px; height: 20px; ">
            <span class="font_setting">{{cutlery}}</span>
          </div>

        </div>
        <div class="extro-info__item">
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
                        :value="good.sweetLevel"
              />
            </span>
          </div>
        </van-cell>
        <van-cell>
          <div class="zm-goods__fresh">
            <span style="float: left; font-size: 12px;">保鲜条件：</span>
            <span style="float: left; font-size: 12px;">{{good.freshCondition}}</span>
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
      <div v-if="commentContent !== null" class="zm-goods__review_detail">
        <img :src="avatarUrl" class="avatar-img">
        <div style="width: 60%;">
          <div class="star_comment">
            {{commentContent}}
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
          type="warning"
          @click="onAddCartButton"
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
               custom-style=" top:50%;"
               @close="popUpClose"
               :overlay="true">
      <div class="van-popup__panel">
        <div style="display: flex; align-items: center; padding: 10px">
          <div class="van-popup__panel_price">
            <span>
              ￥
            </span>
            <span style="font-size: 30px;">
              {{chooseSKU.salePrice}}
            </span>
          </div>
          <span v-if="good.stock <= 5" style="color: red; padding-left: 10px;">少量库存</span>
        </div>
        <div class="van-popup__panel_line">
        </div>
        <div class="van-popup__panel_extro">
          <div class="van-popup__panel_extro__item">
            <div class="extro-info__item_i">
              <img src="../../asset/size.png" style="width: 20px; height: 20px; ">
              <span class="font_setting">{{chooseSKU.cakeSize}}</span>
            </div>
          </div>
          <div class="van-popup__panel_extro__item">
            <div class="extro-info__item_i">
              <img src="../../asset/people.png" style="width: 20px; height: 20px; ">
              <span class="font_setting">{{chooseSKU.capacity}}</span>
            </div>
          </div>
          <div class="van-popup__panel_extro__item">
            <div class="extro-info__item_i">
              <img src="../../asset/time.png" style="width: 20px; height: 20px; ">
              <span class="font_setting">{{chooseSKU.copies}}</span>
            </div>
          </div>
          <div class="van-popup__panel_extro__item">
            <div class="extro-info__item_i">
              <img src="../../asset/cutlery.png" style="width: 20px; height: 20px; ">
              <span class="font_setting">{{cutlery}}</span>
            </div>
          </div>

          <div class="van-popup__panel_extro__item">
            <div class="extro-info__item_i">
              <img src="../../asset/cutlery.png" style="width: 20px; height: 20px; ">
              <span class="font_setting">{{deliverTime}}</span>
            </div>

          </div>
        </div>
        <div style="font-family: 'Microsoft YaHei'; font-size: 12px;padding: 0px 20px">规格</div>
        <div class="van-popup__panel_attribute">
          <span v-for="(item, index) in productSKUs" :key="index">
           <check-box
            :id="item.skuId"
            :name="item.attributeName"
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
  import {GET_PRODUCT_DETAIL_BY_ID, PRODUCT_NOTICE, GET_PRODUCT_SKU_DETAIL_BY_ID, GET_STAR_COMMENT } from '@/utils/api';
  import {request} from "@/utils/request";
  import { mapGetters, mapActions } from 'vuex';
  import { ADD_PRODUCT_TO_CART } from '@/store/mutation-types';
  import CheckBox from '@/components/CheckBox';
  import {toast} from '../../utils/toast';
  export default {
    components: {
      CheckBox
    },
  data() {
    return {
      active: 0,
      good: {
      },
      popShow:false,
      outShowUp:false,
      urls: {"firstUrl":"http://yangliuyi.oss-cn-shanghai.aliyuncs.com/zhimu/images/20190816/机器猫.jpg"},
      productSKUs: [],
      chooseSKU :{},
      popupText: "加入购物车",
      comment: null,
      commentContent:"",
      commentUrl:"",
      phoneNo:"",
      isNoticed:false,
      avatarUrl:""
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
      let that = this;
      if (this.good.onlineStatus === 1003 || this.good.onlineStatus === 1004) {
        this.popShow = false;
        //   弹起到货提醒的订阅
        wx.requestSubscribeMessage({
          tmplIds: ['By9NVDZM5spRmqLOVnHtBG1CooMzmh3g0ds48Oic4W0'],
          success (res) {
            if (res.By9NVDZM5spRmqLOVnHtBG1CooMzmh3g0ds48Oic4W0 === 'accept') {
              //订阅成功
              that.addProductNotice();
              console.log("订阅成功", res)
            }else {
              console.log("拒绝订阅", res)
            }
          }
        })
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
      if (this.good.onlineStatus === 1003 || this.good.onlineStatus === 1004) {
        this.popupText = "到货通知";
     }else {
        this.popupText = "加入购物车";
      }
      this.popShow = true;
    },
    addToBuy() {
      this.popShow = false;
      let that = this;
      if (this.good.onlineStatus === 1003 || this.good.onlineStatus === 1004)  {
      //   弹起到货提醒的页面
        wx.requestSubscribeMessage({
          tmplIds: ['By9NVDZM5spRmqLOVnHtBG1CooMzmh3g0ds48Oic4W0'],
          success (res) {
            if (res.By9NVDZM5spRmqLOVnHtBG1CooMzmh3g0ds48Oic4W0 === 'accept') {
              //订阅成功
              that.addProductNotice();
              console.log("订阅成功", res)
            }else {
              console.log("拒绝订阅", res)
            }
          }
        })

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
      if (this.good.onlineStatus === 1003) {
        this.popupText = "到货通知";
      }else if (this.good.onlineStatus === 1004)  {
        this.popupText = "到货通知";
      }else {
        this.popupText = "立即购买";
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
          console.log("this.good response", this.good);
          this.productSKUs = response.pmsProductSkuList;
          this.chooseSKU = this.productSKUs.find(
            function (sku) {
              return sku.isPrime === true;
            }
          );
          console.log("chooseSKU", this.chooseSKU);
          wx.setNavigationBarTitle({
            title: this.good.name
          });
          this.urls = JSON.parse(this.good.detailPicUrl)
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
    },

    phoneNoChange(event) {
      console.log("event: ", event)
      this.phoneNo = event.mp.detail;
    },


    getStarComment(data) {
      request(
        GET_STAR_COMMENT,
        'GET',
        data
      ).then(
        (response) => {
          console.log("this.good response", response);
         this.comment = response;
         this.commentContent = response.content;
         this.avatarUrl = response.avatarUrl;
        }
      )
    },
    outShowClose() {
      this.outShowUp = false;
    },

    addProductNotice() {
      let params = {};
      params.productId = this.good.id;
      params.userId = this.userId;
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
        title: "自定义转发标题",
        path:'/page/detail/main?productId=123'
      }
    },

    onShow() {
      console.log(this.$root.$mp.query);
          let params = {};
          params.productId = this.$root.$mp.query.productId;
          //后续可以将这两个请求合并成一个
          this.getProductDetail(params);
          this.getStarComment(params);
          this.commentUrl = "/pages/comments/main?productId=" + this.$root.$mp.query.productId;

      //    将数据还原，后续用Obejct.assign
      this.popShow = false;
      this.outShowUp = false;
      this.phoneNo = "";
      this.isNoticed = false;

      },
    computed: {
      attribute() {
        return "已选择：" + this.chooseSKU.attributeName;
      },
      vipTip() {
        let freeAmount = this.chooseSKU.salePrice * 0.1;
        return "会员5张9折券，本次至少可省￥" + freeAmount.toFixed(2);
      },
      content() {
        if (this.isNoticed) {
          return "订阅成功," + this.good.name + "有货时我们将给您发送通知";
        }else {
          return "您希望在" + this.good.name + "有货时收到通知么?";
        }
      },
      deliverTime() {
        let hour = this.chooseSKU.deliverTime;
        if (this.chooseSKU.deliverTime === 1) {
          return "现货下单立即配送";
        } else {
          // 如果跨夜统一为第二天营业时间配送
          let nowDate = new Date();
          let delt = nowDate.getHours() + hour;
          console.log("delt", delt);
          if (delt > 20) {
            return "最早明天10点可配送";
          } else {
            let delt_f = delt + ":00";
            return "最早今天"+ delt_f + "可配送";
          }
        };
      },
      cutlery() {
        return "含" + this.chooseSKU.cutlery + "套餐具";
      },
      ...mapGetters(
        [
          'cartTotalCount','userId','isVip'
        ]
      )

    }
}
</script>


<style lang="scss" scoped>
  .font_setting {
    font-size: 12px;
    font-family: 'Microsoft YaHei';
    padding-left: 5px;
    /*color: #888888;*/
  }


  .star_comment {
    background-color: #CFD4DA;
    width: 200px;
    border-radius: 5px;
    font-size: 13px;
    padding: 10px;
  }
  .van-popup__panel_extro__item {
    box-sizing: border-box;
    flex: 0 0 50%;
    padding: 5px 5px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
  }
  .zm-goods__notice {
    margin: 20px;
  }


  .zm-goods__detail {
    font-size: 0;
    margin:0;
    padding:0;
  }
  .zm-goods__detail-img {
    width: 100%;
  }
  .van-popup__panel_extro_item {
    box-sizing: border-box;
    flex: 0 0 50%;
    padding: 5px 5px;
    font-size: 16px;
    font-family: "Microsoft YaHei";
  }
  .van-popup__panel_attribute {
    display: flex;
    padding: 10px 15px;
  }
  .extro-info__item_i {
    display: flex;
    align-items: center;
  }
  .van-popup__panel_price{
    padding: 0px 10px;
  }

  .zm-goods__review_detail {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px;
    padding-bottom: 10px;
  }
  .avatar-img {
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
  .vip_tip_class {
    display: flex;
    justify-content: space-around;
    font-size: 13px;
    background-color: #fde3ca;
    margin: 10px;
    padding: 5px 0px;
  }

  .attribute-extro-info {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    background-color:white;
    padding:10px 15px;
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
    width:100%;
    border-bottom:1px solid #f2f2f2;
    transition:width .4s ease-in-out;
  }
  .van-popup__panel_extro {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    padding: 10px 15px;
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
    padding-bottom:50px;
  .zm-goods__head {
    position: relative;
    padding-bottom: 10px;
    background-color: white;
  .zm-goods__name {
    font-size: 16px;
    margin: 5px 0;
    text-align: left;
  }
  .zm-goods__share {
    position: absolute;
    right: 10px;
    top: 0px;
    text-align: center;
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

  .zm-goods__ingredients__content {
    position: absolute;
    width: 80px;
  }
  }
  }
  }

  }
  button {
    font-size: 10px;
    background-color: #FFFFFF;
    color: #888888;
  }
  button::after {
    border: none;
  }
</style>
<style lang="scss">
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

