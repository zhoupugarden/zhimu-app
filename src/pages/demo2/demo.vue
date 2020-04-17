<template>
  <div  class="menu">
    <div class="menu-wrap">
       <!--菜单导航-->
      <scroll-view class="menu-nav" :scroll-y="true"
                   :scroll-into-view="'nav'+selectIndex">
        <li v-for="(item, index) in navDemo" :key="item.id"
            :id="'nav'+index"
            class="nav-item"
            :class="{active: selectIndex==index}"
            @click="selectMenuAction(index)">
          <span>{{item.name}}</span>
        </li>
      </scroll-view>

      <!-- 菜单内容 -->
      <scroll-view class="menu-list" :scroll-y="true"
                   :scroll-into-view="'group'+menuIndex"
                   @scroll="menuListScrollAction"
      >
        <div style="border-bottom: 1px dashed #b2b2b2;" v-for="(products, index) in productList" :key="index" :id="'group'+index">
          <h3 class="group-title">{{navDemo[index].name}}</h3>
          <ul>
            <li v-for="(item, j) in products" :key="item.id" class="menu-item">
              <card :cardInfo="item"
                    @popCart="onPopCart"></card>
            </li>
          </ul>
        </div>
      </scroll-view>
    </div>
    <!--弹出框-->
    <div>
      <cart-pop :popShow="popCartActive"
                :productSKUs="productSKUs"
                @popUpClose="closeActive" @addProductToCart="addToCart"></cart-pop>
    </div>
  </div>
</template>

<script>

  import {INDEX_LIST, INDEX_INFO} from '@/utils/api';
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
        categoryNameList:[],
        categoryList:[],
        popCartActive:false,
      }
    },
    computed: {

      ...mapState({
        navDemo: state=>state.home.categoryNameList,
        productList: state=>state.home.productList,
      }),

      heightArr(){
        let heightArr = this.productList.map(item=>{
          return item.length*240+30;
        });
        console.log(heightArr);
        return heightArr;
      }
    },
    methods: {


      ...mapActions(
        [
          'addProductToCart', 'addMerchantInfo', 'addDeliverConfig', 'addAdSettings'
        ]

      ),

      // 菜单导航的点击事件
      selectMenuAction(index){
        // 设置选中的菜单
        this.menuIndex = index;
        console.log("index, this.selectIndex", index, this.selectIndex, this.selectIndex==index);
        /*
        // 方式1:
        // 计算高度，滚动到对应位置
        let height = 0;
        for(let i = 0; i < index; i++){
            height += this.heightArr[i];
        }
        this.scrollTop = height;
        */
        // 方式2
        // 切换scroll-into-view
      },
      // 菜单的滚动事件
      menuListScrollAction(ev){
        let top = ev.mp.detail.scrollTop;

        /*
         [1030, 630, 330, 330, 2130, 930, 2130, 530, 330, 630, 330, 230]

         0~1030    0
         1030~1030+630 1
         ...
        */

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

      onPopCart(data) {
        this.popCartActive = false;
        console.log("data",data);
        let productId = data.productId;
        this.productSKUs
          = this.productList[this.selectIndex].find(
          item => item.id === productId
        );
        console.log("this.productSKUs", this.productSKUs);
        this.popCartActive = true;
      },
      closeActive() {
        console.log("closeActive")
        this.popCartActive = false;
      },
      addToCart(data) {
        console.log("addTocart", data)
        this.addProductToCart(data);
        // //加些过渡动画
        // this.popCartActive = false;
      },


    },
    watch: {
      active(val) {
        console.log("active----", val);
      }
    },
    mounted(){
      // 请求商家的菜单数据
      // this.indexList();
      let {id} = this.$root.$mp.query;
      this.$store.dispatch('home/getHomeData', {id});

    }
  }
</script>

<style scooped>
  .menu-wrap{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 45px;
    display: flex;
  }
  .menu-nav{
    width: 100px;
    height: 100%;
    font-size: 14px;
    background: #f2f2f2;
  }
  .nav-item{
    padding: 12px 5px;
  }
  .nav-item.active{
    font-weight: bold;
    background: white;
  }
  .menu-nav image{
    width: 12px;
    height: 12px;
  }
  .menu-list{
    flex: 1;
    height: 100%;
    margin: 0 10px;
  }
  .group-title{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 2px solid #D9B56E;
    width: 70px;
    text-align: center;
  }
  .menu-item{
    display: flex;
    height: 240px;
    padding: 10px 0;
  }
  .menu-item .pic{
    width: 80px;
    height: 80px;
  }
  .menu-item .content{
    margin-left: 5px;
    flex: 1;
  }
  .menu-item .content .title{
    font-size: 14px;
    color: #222;
    font-weight: bold;
  }
  .tools{
    width: 100%;
    height: 45px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: palegoldenrod;
  }
</style>
