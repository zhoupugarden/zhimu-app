<template>
  <div  class="menu">
    <div class="menu-wrap">
       <!--菜单导航-->
      <scroll-view class="menu-nav" :scroll-y="true"
                   :scroll-into-view="'nav'+selectIndex">
        <li v-for="(item, index) in categoryNameList" :key="index"
            :id="'nav'+index"
            class="nav-item"
            :class="{active: selectIndex==index}"
            @click="selectMenuAction(index)">
          <div v-if="item.hasNew" class="nav_item_tag">
            new
          </div>
          <div style="line-height:50px;">{{item.name}}</div>
        </li>
      </scroll-view>
      <!-- 菜单内容 -->
      <scroll-view class="menu-list" :scroll-y="true"
                   :scroll-into-view="'group'+menuIndex"
                   @scroll="menuListScrollAction"
      >
        <div :id="'group' + 100" v-if="adHeadSettings" class="index-header" @click="navigateToActivity">
          <image style="width: 100%; height: 120px; " mode="scaleToFill" :src="adHeadSettings.imgUrl"></image>
        </div>

        <div style="border-bottom: 1px dashed #b2b2b2;" v-for="(products, index) in productMenuList" :key="index" :id="'group'+index">
          <h3 class="group-title">{{categoryNameList[index].name}}</h3>
          <ul>
            <li v-for="(item, _index) in products" :key="_index" class="menu-item">
              <product-card :cardInfo="item"
                    @popCart="onPopCart"></product-card>
            </li>
          </ul>
        </div>
      </scroll-view>
    </div>
    <div v-show = "merchantInfo.status === merchantStatusEnum.closing || merchantInfo.status === merchantStatusEnum.resting" class="rest_notice">
      {{restNotice}}
    </div>
    <!--弹出框-->
    <div>
      <cart-pop :popShow="popCartActive"
                :productInfo="productInfo"
                :productSKUs="productSku"
                @popUpClose="closeActive" @addProductToCart="addToCart"></cart-pop>
    </div>
  </div>
</template>

<script>
  import ProductCard from '@/components/ProductCard';
  import {GET_PRODUCT_DETAIL_BY_ID} from '@/utils/api';
  import {request} from "@/utils/request";
  import cartPop from '@/components/cartPop';
  import {mapState, mapActions} from 'vuex';
  import {merchantStatusEnum} from '@/utils/enums'

  export default {
    components: {
      ProductCard,cartPop
    },
    data(){
      return {
        selectIndex: 0,
        menuIndex: 0,
        scrollTop: 0,
        popCartActive:false,
        productSku:[],
        productInfo:{},
        merchantStatusEnum:merchantStatusEnum
      }
    },
    computed: {
      ...mapState({
        categoryNameList: state=>state.home.categoryNameList,
        productMenuList: state=>state.home.productMenuList,
        merchantInfo: state=>state.merchant.merchantInfo,
        adHeadSettings: state => state.merchant.adHeadSettings
      }),

      heightArr(){
        let heightArr = this.productMenuList.map(item=>{
          return item.length*240+30;
        });
        console.log("heightArr", heightArr);
        return heightArr;
      },

      restNotice() {
        if (this.merchantInfo.status === merchantStatusEnum.closing) {
          return "休息中，" + "营业时间 " + this.merchantInfo.openTime + "-" + this.merchantInfo.closeTime
        }else if (this.merchantInfo.status === merchantStatusEnum.resting) {
          return "休假中，" + "休假时间 " + this.merchantInfo.restStartDate + "到" + this.merchantInfo.restEndDate
        }else {
          return '';
        }
      },

    },
    methods: {
      ...mapActions(
        [
          'addProductToCart'
        ]
      ),

      // 菜单导航的点击事件
      selectMenuAction(index){
        // 设置选中的菜单
          this.menuIndex = index;
      },
      // 菜单的滚动事件
      menuListScrollAction(ev){
        let top = ev.mp.detail.scrollTop;
        let height = ev.mp.detail.scrollHeight;
        let index = 0;
        if(top >= 0){
          //点击最后一个 menuIndex，需要特殊处理 额外加50
          let tail = 2 * 240 + 30 + 50;
          console.log("============", top, tail, top+tail, height);
          if (top + tail >= height) {
            index = this.heightArr.length - 1;
            console.log("============");
          } else {
            for(let i = 0; i < this.heightArr.length; i++){
              let min = 0;
              for(let j = 0; j < i; j++){
                min += this.heightArr[j];
              }
              let max = 0;
              max = min + this.heightArr[i];
              if(top >= min && top < max){
                index = i;
                break;
              }
            }
          }
        }
          this.selectIndex = index;

        console.log("this.selectIndex", this.selectIndex);
        console.log("this.menuIndex", this.menuIndex);
        console.log("this.heightArr.length", this.heightArr.length);
      },

      getProductDetail(data) {
        request(
          GET_PRODUCT_DETAIL_BY_ID,
          'GET',
          data
        ).then(
          (response) => {
            this.productInfo = response.productDto;
            this.productSku = response.skuDtoList;
            this.popCartActive = true;
          }
        )
      },

      onPopCart(data) {
        this.popCartActive = false;
        console.log("data",data);
        let productId = data.productId;
        let params = {};
        params.productId = productId;
        this.getProductDetail(params);
      },
      closeActive() {
        this.popCartActive = false;
      },
      addToCart(data) {
        data.picUrl = this.productInfo.headPicUrl;
        data.type = this.productInfo.type;
        data.categoryId = this.productInfo.categoryId;
        data.productName = this.productInfo.name;
        this.addProductToCart(data);
        // //加些过渡动画
        // this.popCartActive = false;
      },

      navigateToActivity() {
        if (this.adHeadSettings.isNavigate) {
          let url = this.adHeadSettings.navigateUrl;
          wx.navigateTo({
            url
          });
        } else {
          console.log("不需要跳转");
        }
      }
    },
    onShow(){
      this.$store.dispatch('home/getHomeData');
      this.$store.dispatch('merchant/getMerchantData');
      if (this.adHeadSettings) {
        this.menuIndex = 100;
      }
    },
    onUnload() {
      //退出后关闭页面
      this.popCartActive = false;
    }

  }
</script>

<style lang="scss" scooped>
  @import "home.scss";
</style>
