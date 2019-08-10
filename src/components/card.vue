<template>
  <div class="zm-panel" @click="navigateToProduct">
    <div class="zm-card">
      <div class="zm-card__thumb">
        <img class="zm-card__img" mode="aspectFill"
             :src="cardInfo.headUrl">
      </div>
      <div class="zm-card__detail">
        <div class="zm-card__detail__name">
          <span>{{cardInfo.name}}</span>
        </div>
        <div class="zm-card__detail__ename">
          <span>{{cardInfo.englishName}}</span>
        </div>
        <van-icon name="shopping-cart-o" size = 20px class="zm-detail__icon"/>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props:['cardInfo'],
    data () {
      return {
        data: {
          productId: '123'
        }
      }
    },
    methods: {
      navigateToProduct() {
        var url = "../detail/main?productId=" + this.cardInfo.productId;
        console.log("url",url)
        wx.navigateTo({
          url
        });
      }
    },
    created() {
      console.log(this.cardInfo)
    }
  }
</script>
<style lang="scss"  scoped>
  .zm-panel {
    position: relative;
    background: #fff;
    margin-top: 10px;
    overflow: hidden;
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
        width:320px;
        height:180px;
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
        .zm-card__detail__ename {
          margin-top: 2px;
          margin-left: 10px;
          margin-bottom: 10px;
        }
        .zm-detail__icon {
          position: absolute;
          top:10px;
          right: 20px;
        }
      }
    }

  }

</style>
