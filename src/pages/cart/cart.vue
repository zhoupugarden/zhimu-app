<template>
  <div class="cart-container">
    <div class="cart-no-container" v-if="cartList.length===0">
      <van-icon name="shopping-cart-o"></van-icon>
      <div style="font-size: small; font-family: 'Microsoft YaHei'">您的购物车是空的</div>
    </div>
    <div v-else>
      <div class="cart-container__detail">
        <div v-for="(item, index) in productCartList" :key="index">
          <cart-card
            @increItem="increItem"
            @decreItem="decreItem"
            @removeItem="removeItem"
            :cardItem="item"></cart-card>
        </div>
      </div>
      <div v-if="showTip" class="cart-container__tip">
        请在下方选择需要的配件
      </div>
      <div class="cart-container__fitting">
        <div class="cart-container__fitting--nav">
          <van-button size="small" @click="addFire">蜡烛</van-button>
          <van-button size="small" @click="addHat">帽子</van-button>
          <van-button size="small" @click="addPeachFire">桃心蜡烛</van-button>
          <van-button size="small" @click="popUpShow">配件饰品</van-button>
        </div>
        <div class="cart-container__fitting--detail">
          <div v-for="(item, index) in freeCartList" :key="index">
            <free-card :item="item"
                       @delFromCart="removeItem"
            ></free-card>
          </div>
        </div>
      </div>
      <div class="cart-container__bottom">
        <div class="cart-container__bottom--line">
        </div>
        <div class="cart-container__bottom--total">
          总计：{{cartTotalPrice}}
          <div class="cart-container__bottom--fee">
            另需配送费5元
          </div>
        </div>

        <div class="cart-container__bottom--button">
          <van-button size="large" type="primary" @click="navigateToSubmit">下一步</van-button>
        </div>
      </div>
      <van-popup position="bottom"
                 :show="popShow"
                 custom-class="van-popup__custom--cart"
                 @close="popUpClose"
      >
        <div class="van-popup__custom--container">
          <div v-for="(item, index) in payGood" :key="index">
            <pay-card
              @addToCart="addGoodToCart"
              :item="item"
            ></pay-card>
          </div>
        </div>
      </van-popup>
      <van-dialog id="van-dialog" />
    </div>

  </div>
</template>

<script>
  import cartCard from '@/components/cartCard';
  import FreeCard from '@/components/FreeCard';
  import PayCard from '@/components/PayCard';
  import { mapState, mapMutations,mapGetters, mapActions } from 'vuex';
  import { SET_OPEN_ID } from '@/store/mutation-types';
  import Dialog from '../../../static/vant/dialog/dialog';


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
        attribute:"1个",
      },
      totalAmount: 1000,
      showTip:true,
      popShow:false,
      freeGood:[
        {
          skuId:31,
          url: "https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
          productName:"yangyu测试",
          salePrice:"0.00",
          attributeName:"1个",
          type:2
        },
        {
          skuId:32,
          salePrice:"0.00",
          url: "https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
          productName:"yangyu测试",
          attributeName:"1个",
          type:2
        },
        {
          skuId:33,
          url: "https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
          productName:"yangyu测试",
          attributeName:"1个",
          salePrice:"0.00",
          type:2
        }
      ],
      payGood: [
        {
          url: "https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
          tag:"热销",
          salePrice:"10.12",
          originPrice:"100",
          title:"杨宇测试",
          attributeName:"1个",
          productId:456,
          skuId:58,
          productName:"付费商品",
          type:1
        },
        {
          url: "https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
          tag:"热销",
          salePrice:"10.12",
          originPrice:"100",
          title:"杨宇测试",
          attributeName:"1个",
          productId:456,
          skuId:59,
          productName:"付费商品",
          type:1
        }
      ]
    }
  },
  computed: {
    ...mapGetters(
      [
        'cartList',
        'cartTotalPrice',
        'productCartList',
        'freeCartList',
        'isExistCake'
      ]
    )

  },
  methods: {

    ...mapActions(
      [
        'delProductFromCart',
        'incrementInventory',
        'decrementInventory',
        'addProductToCart'
      ]
    ),
    storeButton() {
      this.setOpenId("123456")
    },
    popUpClose() {
      console.log("popUpClose");
      this.popShow = false;
    },
    popUpShow() {
      this.popShow = true;
    },
    navigateToSubmit() {
      var url = "/pages/ordersubmit/main";

      console.log(this.productCartList)
      console.log("url",url)
      wx.navigateTo({
        url
      });
    },
    removeItem(data) {
      console.log(data)

      Dialog.confirm({
        title: '删除确认'
      }).then(() => {
        this.delProductFromCart(data);
      }).catch(() => {
        // on cancel
      });
    },
    increItem(data) {
      console.log(data)
      this.incrementInventory(data)
    },
    decreItem(data) {
      console.log(data)
      this.decrementInventory(data)
    },
    addFire() {
      let fire = this.freeGood[0];
      this.addProductToCart(fire);
    },
    addHat() {
      let hat = this.freeGood[1];
      this.addProductToCart(hat);
    },
    addPeachFire() {
      let peach = this.freeGood[2];
      this.addProductToCart(peach);
    },
    addGoodToCart(data) {
      console.log("Card good",data)
      this.addProductToCart(data);
    }

  },
  mounted() {
    console.log("需要检查库存")
  }
}
</script>

<style lang="scss" scoped>
  .cart-close {
    background-color: red;
  }
  .cart-container {
    position: relative;
    height: 100%;
  }
  .cart-no-container {
    position: absolute;
    top: 40%;
    left: 40%;
    text-align: center;
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
<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
