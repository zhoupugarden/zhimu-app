<template>
  <div>

  <div>
    <div class="sideBarClass">
      <van-sidebar :active-key="active" @change="sideBarChange">
        <div v-for="(category, index) in categoryList" :key="index">
          <van-sidebar-item :title="category.name" />
        </div>
      </van-sidebar>
    </div>
  </div>
    <div  class="productListClass">
    <scroll-view  class="goods_wrap"  :scroll-into-view="toView"  scroll-y="true">
      <div :id="'id_'+ index"  v-for="(category, index) in categoryList" :key="index">
        <div class="categoryTitleClass">
          {{category.name}}
          <div style="height: 300px;">
            {{category.name}}
          </div>
        </div>
        <!--<div v-for="(product, _index) in category.pmsProductPlusList" :key="_index">-->
          <!--<card :cardInfo="product"-->
          <!--&gt;</card>-->
        <!--</div>-->

      </div>
    </scroll-view>
    </div>

    <!--<div v-show= "merchantInfo.status === 1003 || merchantInfo.status === 1004" class="rest_notice">-->
      <!--{{restNotice}}-->
    <!--</div>-->

  </div>


</template>

<script>
  import {INDEX_LIST, INDEX_INFO} from '@/utils/api';
  import {request} from "@/utils/request";
  import card from '@/components/card';
  import { mapActions } from 'vuex';
  export default {
    components: {
      card
    },
    props: {},
    data() {
      return {
        active: 0,
        categoryList:[],
        scrolledTop:0,
        productListHeight:0 ,
        categoryNum :0,
        productNum:0,
        foodAreaHeight:[0],
        merchantInfo:{},
        toView:''
      }
    },

    methods: {
      ...mapActions(
        [
          'addProductToCart', 'addMerchantInfo', 'addDeliverConfig', 'addAdSettings'
        ]
      ),

      productListScrolling(e) {
        console.log("======productListScrolling========");
        let currentTop = e.mp.detail.scrollTop;
        this.foodAreaHeight.forEach((item,index)=>{
          if (currentTop >= this.foodAreaHeight[index] && currentTop < this.foodAreaHeight[index+1]){
            this.active = index;
          }
        })
      },
      sideBarChange(e) {
        this.active = e.mp.detail;
        let num = 0;
        if (this.active === 0) {
          this.scrolledTop = 0;
        } else{
          for (let i = 0; i < this.active; i++) {
            num += this.categoryList[i].pmsProductPlusList.length;
          }
          this.scrolledTop = (this.active * 20 + num * 240) * 2 ;
        }
        console.log("this.scrolledTop ", this.scrolledTop );
        this.toView = "id_" + this.active;

      },

      indexInfo() {
        request(
          INDEX_INFO,
          'GET'
        ).then(
          response => {
            console.log("this response", response);
            let config = response.zmDeliverConfig;
            let settings = response.adSettings;
            this.adSettings = response.adSettings;
            if (this.adSettings.find(a => a.adType === 1002)) {
              this.headAdSetting = this.adSettings.find(a => a.adType === 1002);
            }
            this.popAdSetting = this.adSettings.find(a => a.adType === 1001);
            let merchantInfo = response.zmMerchant;
            this.merchantInfo = response.zmMerchant;
            this.addMerchantInfo(merchantInfo);
            this.addAdSettings(settings);
            this.addDeliverConfig(config);
          }
        )
      },

      indexList() {
        request(
          INDEX_LIST,
          'GET'
        ).then(
          response => {
            this.categoryList = response;
            this.categoryNum = this.categoryList.length;
            let num = 0;
            for (let category of this.categoryList) {
              num += 1;
              this.productNum += category.pmsProductPlusList.length;
              let height = num * 20 + this.productNum * 240;
              this.foodAreaHeight.push(height);
            }
            this.productListHeight = (this.categoryNum * 20 + this.productNum * 240);
          }
        )
      },
    },
    computed: {
      restNotice() {
        if (this.merchantInfo.status === 1003) {
          return "休息中，" + "营业时间 " + this.merchantInfo.openTime + "-" + this.merchantInfo.closeTime
        }else if (this.merchantInfo.status === 1004) {
          return "休假中，" + "休假时间 " + this.merchantInfo.restStartDate + "到" + this.merchantInfo.restEndDate
        }else {
          return '';
        }
      }
    },
    onShow() {
      this.indexList();
    },
    onLoad() {
      this.indexInfo();
    }

  }
</script>

<style lang="scss" scoped>
  .sideBarClass {
    position: fixed;
    left: 0px;
    top: 0px;
  }
  .productListClass {
    position: absolute;
    right: 0px;
    padding-bottom: 10px;
    height: 100%;
  }
  .categoryTitleClass {
    border-bottom: 2px solid #CDA65B;
    width: 70px;
    overflow: hidden;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .rest_notice {
    position: fixed;
    bottom: 0px;
    background-color: black;
    color: white;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }


  .goods_wrap{
      box-sizing: border-box;
  }

</style>
