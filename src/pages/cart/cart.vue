<template>
  <div class="cart-container">
    <div class="cart-container__detail">
      <cart-card
        :thumbUrl="good.url"
        :tag="good.tag"
        :price="good.price"
        :originPrice="good.originPrice"
        :title="good.title"
        :attribute="good.attribute"
      >
      </cart-card>
    </div>

    <div v-if="showTip" class="cart-container__tip">
      请在下方选择需要的配件
    </div>

    <div class="cart-container__fitting">
      <div class="cart-container__fitting--nav">
        <van-button size="small">蜡烛</van-button>
        <van-button size="small">帽子</van-button>
        <van-button size="small">付费饰品</van-button>
        <van-button size="small" @click="popUpShow">配件饰品</van-button>
      </div>
      <div class="cart-container__fitting--detail">
        <free-card
          :srcUrl="good.url"
          :name="good.name"
        ></free-card>
      </div>
    </div>
    <van-popup position="bottom"
               :show="popShow"
               custom-class="van-popup__custom--cart"
               @close="popUpClose"
               >
      <div class="van-popup__custom--container">
        <pay-card
          :srcUrl="good.url"
          :name="good.name"
          :price="good.price"
        ></pay-card>
      </div>


    </van-popup>

  <!--<div class="van-popup__custom&#45;&#45;cart">-->
    <!--<div class="cart-container__popup&#45;&#45;nav">-->
      <!--<van-button size="small">蜡烛</van-button>-->
      <!--<van-button size="small">帽子</van-button>-->
      <!--<van-button size="small">付费饰品</van-button>-->
      <!--<van-button size="small">配件饰品</van-button>-->
    <!--</div>-->
    <!--<div class="cart-container__popup&#45;&#45;detail">-->
      <!--<free-card-->
        <!--:srcUrl="good.url"-->
        <!--:name="good.name"-->
      <!--&gt;</free-card>-->
    <!--</div>-->
  <!--</div>-->


    <div class="cart-container__bottom">
      <div class="cart-container__bottom--line">
      </div>
      <div class="cart-container__bottom--total">
        总计：{{totalAmount}}
        <div class="cart-container__bottom--fee">
          另需配送费5元
        </div>
      </div>

      <div class="cart-container__bottom--button">
        <van-button size="large" type="primary">下一步</van-button>
      </div>
    </div>



  </div>


</template>

<script>

  import cartCard from '@/components/cartCard';
  import FreeCard from '@/components/FreeCard';
  import PayCard from '@/components/PayCard';

  import { mapState, mapMutations } from 'vuex';
  import { SET_OPEN_ID } from '@/store/mutation-types';


export default {

  components: {
    cartCard, FreeCard, PayCard
  },

  data() {
    return {
      good : {
        url: "https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
        name:"yangyu测试",
        tag:"热销",
        price:"10.12",
        originPrice:"100",
        title:"杨宇测试",
        attribute:"1个"
      },
      totalAmount: 1000,
      showTip:true,
      popShow:false
    }
  },
  computed: {
    ...mapState([
      'openId'
    ])
  },
  methods: {
    ...mapMutations({
      setOpenId: 'SET_OPEN_ID'
    }),
    storeButton() {
      this.setOpenId("123456")
    },
    popUpClose() {
      console.log("popUpClose");
      this.popShow = false;
    },
    popUpShow() {
      this.popShow = true;
    }

  }



}
</script>

<style lang="scss" scoped>
  .cart-close {
    background-color: red;
  }
  .cart-container {
    position: relative;
  }

  .cart-container__bottom {
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0;
    z-index: 100;
  }
  .cart-container__popup {
    z-index: -1;
  }
  .cart-container__bottom--button {
    position: fixed;
    bottom: 20px;
    width: 90%;
    /*还需要仔细研究如何居中显示*/
    left: 4%;
  }
  .cart-container__tip {
    padding-top: 20px;
    font-size: 50%;
    font-weight: lighter;
    text-align: center;
  }
  .cart-container__bottom--line {
    width: 100%;
    height: 1px;
    border-top: solid #ACC0D8 1px;
  }
  .cart-container__bottom--fee {
    font-size: 50%;
    display: inline-block;
  }

  .cart-container__fitting--nav {
    display: flex;
    justify-content: space-around;
    padding-bottom: 10px;
  }
  .cart-container__popup--detail {
    padding-bottom: 10px;
  }

  .cart-container__popup {
    position: relative;
  }
  .cart-container__fitting {
    padding-top: 10px;

  }



</style>
<style lang="scss">
  .van-popup--bottom {
    height: 60% !important;
  }
  /*放在scope里面不行*/
  .van-popup__custom--cart {
    background-color: red;
    width: 100%;
    height: 90%;
    padding: 20px;
  }
  .van-popup__custom--container {

  }

</style>
