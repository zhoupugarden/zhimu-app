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

      </div>

      <div class="cart-container__fitting--detail">

      </div>

    </div>

    <div class="cart-container__popup">
      <van-popup position="bottom"
                 :show="popShow"
                 :close-on-click-overlay="true"
                 @close="popUpClose"
                 :overlay="true">
        哈哈哈
      </van-popup>
    </div>

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

  import { mapState, mapMutations } from 'vuex';
  import { SET_OPEN_ID } from '@/store/mutation-types';


export default {

  components: {
    cartCard
  },

  data() {
    return {
      good : {
        url: "https://upload-images.jianshu.io/upload_images/5804947-f12ec57c3896fb75.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/632/format/webp",
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
    }

  }



}
</script>

<style lang="scss" scoped>
  .cart-close {
    background-color: red;
  }

  .cart-container__bottom {
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0;
    z-index: 100;
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

</style>

