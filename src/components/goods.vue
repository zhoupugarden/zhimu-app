<template>
  <div class="zm-goods__container">
    <div class="zm-goods__head">
      <img :src="good.imageUrl" mode="aspectFill">
      <van-cell-group>
        <van-cell>
          <div class="zm-goods__name">{{goodInfo.name}}</div>
          <div class="zm-goods__price">{{'￥' + goodInfo.linePrice}}</div>
        </van-cell>
        <van-cell custom-class="demo"
                  title="会员5张9折券，本次至少可省￥13.80"  is-link value="立即开通" />
      </van-cell-group>
    </div>
    <div class="zm-goods__extroInfo">
      <van-cell-group>
        <van-cell :title="attribute" is-link @click="chooseAttributes" />
        <van-cell>
          <div class="zm-goods__skuExtroInfo">
          </div>
        </van-cell>
        <van-cell>
          <div>
            参考甜度
          </div>
        </van-cell>
        <van-cell>
          <div>
            保鲜条件
          </div>
        </van-cell>
      </van-cell-group>
      <van-popup position="bottom"
                 :show="popShow"
                 :close-on-click-overlay="true"
                 @close="popUpClose"
                 :overlay="true">
        哈哈哈
      </van-popup>
    </div>
    <div class="zm-goods__content">
      <van-tabs :active= "active" animated swipeable sticky @change="onChange">
        <van-tab title="详情">
          <div class="zm-goods__detail">
            详情
          </div>
        </van-tab>
        <van-tab title="原料">
          <div class="zm-goods__ingredients">
            原料
          </div>
        </van-tab>
        <van-tab title="评价">
          <div class="zm-goods__reviews">
            原料
          </div>
        </van-tab>
        <van-tab title="须知">
          <div class="zm-goods__notice">
            注意事项
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="zm-goods__actions">

      <van-goods-action>
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          bind:click="onClickIcon"
        />
        <van-goods-action-button
          text="加入购物车"
          type="warning"
          bind:click="onClickButton"
        />
        <van-goods-action-button
          text="立即购买"
          bind:click="onClickButton"
        />
      </van-goods-action>

    </div>

  </div>

</template>

<script>
  export default {
    props:['goodInfo'],
    data () {
      return {
        active: 1,
          good: {
            imageUrl: 'https://static.excake.com/media/5fcaa940-5af7-42b4-a10b-86fc0ae51580.jpg?imageView2/1/w/600/h/600',
            name:'爱丽丝紫薯蛋糕',
            price: '138',
            attribute: '1磅'
          },
          popShow:false
      }
    },
    methods: {
      chooseAttributes() {
        console.log("chooseAttributes");
        this.popShow = true;
      },
      popUpClose() {
        console.log("popUpClose");
        this.popShow = false;
      }
    },
    computed: {
      attribute() {
        return "请选择：" + this.good.attribute;
      }
    },
    onShow() {
     console.log("###########",this.goodInfo);
    },



  }
</script>
<style lang="scss"  scoped>
  .zm-goods__container {
    position: relative;
    background-color: #E8EDF5;
    margin-top: 10px;
    overflow: hidden;
    .zm-goods__head {
      position: relative;
      .zm-goods__name {
        font-size: 16px;
        margin: 15px 0;
        text-align: left;
      }
      .zm-goods__price {
        margin: 15px 0;
        text-align: left;
        color: red;
      }
      .zm-goods__link  {
        background-color: red;
      }
    }
  .zm-goods__content {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .zm-goods__actions {
    position: fixed;
    bottom: 0;
    z-index: 100;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  }
</style>
<style lang="scss">
  .demo {
    background-color: #ffc95f !important;
    font-size: 8px !important;
    margin-right: 10px !important;
  }
</style>
