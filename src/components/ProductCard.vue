<template>
  <div class="zm-panel" >
    <div class="zm-card" :style="{opacity : maskValue}">

      <div class="zm-card__thumb" @click="navigateToProduct">
        <div v-show="cardInfo.isNew" class="new_product_tag">
          新品
        </div>
        <img class="zm-card__img" mode="aspectFill"
             :src="cardInfo.headPicUrl">
      </div>
      <div class="zm-card__detail">
        <div>
          <div class="zm-card__detail__name">
            <span>{{onlineStatusDesc}}</span>
            <span>{{cardInfo.name}}</span>
          </div>
          <div class="zm-card__detail__price">
            <span :style="{color:cardInfo.promoteType===1004?'red':'black'}">￥{{cardInfo.primeSalePrice}}</span>
            <span v-if="cardInfo.promoteType===1004" class="zm-card__detail__line_price">￥{{cardInfo.primeLinePrice}}</span>
          </div>
        </div>
        <div>
          <div v-if = "pmsOnlineStatus.on_line === cardInfo.onlineStatus && cardInfo.stock > 0" @click="popCart" class="zm-detail__icon">
            <div v-if="cardInfo.skuCount > 1" class="choose_attribute">
              选规格
            </div>
            <div v-else class="add_attribute">
              +
            </div>
          </div>
          <div v-else @click="productNotice" class="zm-card__detail__notice">
            到货通知
          </div>
        </div>
      </div>
    </div>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
  import { PRODUCT_NOTICE } from '@/utils/api';
  import { mapState } from 'vuex';
  import {request} from "@/utils/request";
  import {toast} from '../utils/toast';
  import {subscribeMessage} from '@/utils/wxApi';
  import {pmsOnlineStatusEnum, noticeTypeEnum} from '@/utils/enums'

  export default {
    name: "product-card",
    props: {
      cardInfo:Object
    },
    data () {
      return {
          pmsOnlineStatus:pmsOnlineStatusEnum
      }
    },
    methods: {
      navigateToLogin() {
        let url = "/pages/login/main" ;
        console.log("url",url)
        wx.navigateTo({
          url
        });
      },

      productNotice() {
        if (!this.isLogin) {
          this.navigateToLogin();
        } else {
          let that = this;
          let id = 'By9NVDZM5spRmqLOVnHtBG1CooMzmh3g0ds48Oic4W0';
          let tmplIds = [];
          tmplIds.push(id);
          subscribeMessage(tmplIds,  (res)=> {
            if (res[id] === 'accept') {
              that.addProductNotice();
            }
          });
        }
      },
      addProductNotice() {
        let params = {};
        params.productId = this.cardInfo.id;
        params.noticeType = noticeTypeEnum.product_notice;
        request(
          PRODUCT_NOTICE,
          'POST',
          params
        ).then(
          (response) => {
            if (response.isRepeated === 1) {
              toast("您已订阅, 有货时我们将为您发送到货提醒通知", 3000)
            } else {
              toast("商品到货提醒订阅成功");
            }
          }
        )
      },

      navigateToProduct() {
        let url = "/pages/detail/main?productId=" + this.cardInfo.id;
        wx.navigateTo({
          url
        });
      },
      popCart() {
        this.$emit('popCart', {"productId":this.cardInfo.id});
      }
    },
    computed: {
      onlineStatusDesc() {
        if (this.cardInfo.stock === 0) {
          return "缺货 / "
        }
        return ""
      },
      maskValue() {
        if (this.cardInfo.stock === 0) {
          return 0.6
        } else {
          return 1
        }
      },
      ...mapState({
        isLogin: state => state.isLogin,
        isVip: state => state.isVip
      }),

    }
  }
</script>
<style lang="scss" scoped>
  .zm-panel {
    position: relative;
    background: #fff;
    margin-right: 10px;
    overflow: hidden;
    height: 240px;
  }
    .zm-card {
      margin-left: 0;
      width: auto;
      overflow: hidden;
      position: relative;
      font-size: 14px;
      border-radius: 5px;
      border-width: 1px;
      border-color: #E8EDF5;
    }
    .new_product_tag {
      position: absolute;
      transform: rotate(45deg);
      text-align: center;
      width: 100%;
      background-color: #ffc95f;
      margin-left: 90px;
      font-weight: normal !important;
    }
      .zm-card__thumb {
        width: auto;
        height: 160px;
        position: relative;
        margin-left: auto;
        margin-right: auto;
        overflow: hidden;
        background-size: cover;
        border-radius: 5px;
      }
        .zm-card__img{
          width: 100%;
          height: 160px;

        }
      .zm-card__detail {
        position: relative;
        width:250px;
        margin-top: 10px;
        margin-left: auto;
        display: flex;
        float:left;
        justify-content: space-between;
        align-items: center;
      }
      .zm-card__detail__name {
        margin-left: 10px;
      }

      .zm-card__detail__price {
        margin-left: 10px;
      }
      .zm-card__detail__line_price {
        font-family: "Microsoft YaHei";
        font-size: 12px;
        color: #CFD4DA;
        text-decoration:line-through
      }

      .zm-card__detail__notice {
        width: 80px;
        height: 20px;
        border-radius: 11px;
        background-color: #CDA65B;
        color: white;
        font-size: 14px;
        text-align: center;
        line-height: 18px;
        padding: 2px 0px;
      }
      .zm-detail__icon {
        top: 10px;
        right: 60px;
      }
      .choose_attribute {
        width: 80px;
        height: 20px;
        border-radius: 11px;
        background-color: #CDA65B;
        color: white;
        font-size: 14px;
        text-align: center;
        line-height: 18px;
        padding: 2px 0px;
      }
      .add_attribute {
        width: 22px;
        height: 22px;
        border-radius: 10px;
        background-color: #CDA65B;
        color: white;
        font-size: 14px;
        text-align: center;
      }


</style>
