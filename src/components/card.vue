<template>
  <div class="zm-panel" >

    <div class="zm-card" >
      <div v-show="cardInfo.onlineStatus !== 1001 && cardInfo.onlineStatus !== 1002" class="zm-card__tag">
      <van-tag>{{onlineStatusDesc}}</van-tag>
    </div>
      <div v-show="cardInfo.onlineStatus == 1002" class="zm-card__tag">
        <van-tag type="danger">{{onlineStatusDesc}}</van-tag>
      </div>
      <div class="zm-card__thumb" @click="navigateToProduct">
        <img class="zm-card__img" mode="aspectFill"
             :src="cardInfo.headPicUrl">
      </div>
      <div class="zm-card__detail">
        <div class="zm-card__detail__name">
          <span>{{cardInfo.name}}</span>
        </div>
        <div class="zm-card__detail__price">
          <span :style="{color:cardInfo.linePrice?'red':'black'}">￥{{cardInfo.salePrice}}</span>
          <span v-if="cardInfo.linePrice" class="zm-card__detail__line_price">￥{{cardInfo.linePrice}}</span>
        </div>

        <div v-show= "cardInfo.onlineStatus === 1001 || cardInfo.onlineStatus === 1002" @click="popCart" class="zm-detail__icon">
          <div v-if="cardInfo.pmsProductSkuList.length > 1" class="choose_attribute">
            选规格
          </div>
          <div v-else class="add_attribute">
            +
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cardInfo:Object
    },
    data () {
      return {
        data: {
        }
      }
    },
    methods: {
      navigateToProduct() {
        var url = "../detail/main?productId=" + this.cardInfo.id;
        console.log("url",url)
        wx.navigateTo({
          url
        });
      },
      popCart() {
        console.log("popCart waaaaa");
        this.$emit('popCart', {"productId":this.cardInfo.id});
      }
    },
    computed: {
      onlineStatusDesc() {
        if (this.cardInfo.onlineStatus === 1003) {
          return "当日售罄"
        }
        if (this.cardInfo.onlineStatus === 1004) {
          return "缺货"
        }
        if (this.cardInfo.onlineStatus === 1002) {
          return "预售"
        }
        return ""
      }
    },
    created() {
      console.log(this.cardInfo)
    }
  }
</script>
<style lang="scss" scoped>
  .zm-panel {
    position: relative;
    background: #fff;
    margin-top: 10px;
    margin-right: 10px;
    overflow: hidden;
    height:240px;
    /*::after {*/
      /*content: '';*/
      /*position: absolute;*/
      /*top: 0;*/
      /*left: 0;*/
      /*width: 200%;*/
      /*height: 200%;*/
      /*transform: scale(.5);*/
      /*transform-origin: 0 0;*/
      /*pointer-events: none;*/
      /*box-sizing: border-box;*/
      /*border: 0 solid #e5e5e5;*/
      /*border-top-width: 1px;*/
      /*border-bottom-width: 1px;*/
    /*}*/
    .zm-card__tag {
      position: absolute;
      z-index: 1;
      left: 10px;
      top: 10px;
    }
    .zm-card {
      margin-left:0;
      width:auto;
      /*padding:5px 15px;*/
      overflow:hidden;
      position:relative;
      font-size:14px;
      /*z-index:100;*/
      border-radius: 5px;
      border-style:solid;
      border-width:1px;
      border-color:#E8EDF5;
      .zm-card__thumb{
        width:auto;
        height:160px;
        position:relative;
        margin-left:auto;
        margin-right:auto;
        overflow:hidden;
        background-size:cover;
        border-radius: 5px;
        .zm-card__img{
          position:absolute;
          top:0;left:0;right:0;bottom:0;
          width:auto;height:auto;
          max-width:100%;
          max-height:100%
        }
      }
      .zm-card__detail {
        position: relative;
        width:300px;
        margin-top: 10px;
        margin-left: auto;
        display: inline-block;
        float:left;
        .zm-card__detail__name {
          margin-left: 10px;
        }
        .zm-card__detail__price {

        }
        .zm-card__detail__line_price {
          font-family: "Microsoft YaHei";
          font-size: 12px;
          color: #CFD4DA;
          text-decoration:line-through
        }
        .zm-detail__icon {
          position: absolute;
          top:10px;
          left: 200px;
          .choose_attribute {
            width: 50px;
            height: 20px;
            border-radius: 10px;
            background-color: #CDA65B;
            color: white;
            font-size: 12px;
            text-align: center;
          }
          .add_attribute {
            width: 20px;
            height: 20px;
            border-radius: 10px;
            background-color: #CDA65B;
            color: white;
            font-size: 12px;
            text-align: center;
          }

        }
      }
    }

  }

</style>
