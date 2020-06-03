<template>
  <div  class="menu">
    <div class="menu-wrap">
       <!--菜单导航-->
      <scroll-view class="menu-nav" :scroll-y="true"
                   :scroll-into-view="'nav'+selectIndex">
        <li v-for="(item, index) in categoryNameList" :key="item.id"
            :id="'nav'+index"
            class="nav-item"
            :class="{active: selectIndex==index}"
            @click="selectMenuAction(index)">
          <div v-show="item.hasNew" class="nav_item_tag">
            new
          </div>
          <div>{{item.name}}</div>
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
            <li v-for="(item, j) in products" :key="item.id" class="menu-item">
              <card :cardInfo="item"
                    @popCart="onPopCart"></card>
            </li>
          </ul>
        </div>
      </scroll-view>
    </div>
    <div v-show = "merchantInfo.status === 1003 || merchantInfo.status === 1004" class="rest_notice">
      {{restNotice}}
    </div>
    <!--弹出框-->
    <div>
      <cart-pop :popShow="popCartActive"
                :productSKUs="productSku"
                @popUpClose="closeActive" @addProductToCart="addToCart"></cart-pop>
    </div>
  </div>
</template>

<script>

  import {INDEX_LIST,GET_PRODUCT_DETAIL_BY_ID} from '@/utils/api';
  import {request} from "@/utils/request";
  import card from '@/components/card';
  import cartPop from '@/components/cartPop';
  import {mapState, mapActions} from 'vuex';


  export default {
    components: {
      card,cartPop
    },
    data(){
      return {
        selectIndex: 0,
        menuIndex: 0,
        scrollTop: 0,
        popCartActive:false,
        productSku:[],
        productInfo:{}
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
        console.log(heightArr);
        return heightArr;
      },

      restNotice() {
        if (this.merchantInfo.status === 1003) {
          return "休息中，" + "营业时间 " + this.merchantInfo.openTime + "-" + this.merchantInfo.closeTime
        }else if (this.merchantInfo.status === 1004) {
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
        console.log("index, this.selectIndex", index, this.selectIndex, this.selectIndex==index);
      },
      // 菜单的滚动事件
      menuListScrollAction(ev){
        let top = ev.mp.detail.scrollTop;
        let index = 0;
        if(top >= 0){
          for(let i = 0; i < this.heightArr.length; i++){
            let min = 0;
            for(let j = 0; j < i; j++){
              min += this.heightArr[j];
            }
            let max = 0;
            if(i === this.heightArr.length - 1){
              //    return;
              index = this.heightArr.length - 1;
            }else{
              max = min + this.heightArr[i];
              //    console.log(min, max);
              if( top>= min && top < max){
                index = i;
                break;
              }
            }
          }
        }
        this.selectIndex = index;
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
        if (this.adHeadSettings.isNavigate === 1) {
          let url = this.adHeadSettings.navigateUrl;
          console.log("url",url)
          wx.navigateTo({
            url
          });
        } else {
          console.log("不需要调整");
        }

      }
    },
    watch: {
      active(val) {
        console.log("active----", val);
      }
    },
    onShow(){
      this.$store.dispatch('home/getHomeData');
      if (this.adHeadSettings) {
        this.menuIndex = 100;
      }
    }
  }
</script>

<style lang="scss" scooped>
  @import "home.scss";
</style>
