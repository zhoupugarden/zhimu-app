<template>
  <div class="evaluationitem-container">
    <div class="evaluation-product-item">
      <div class="product-pic">
        <img :src="productItem.imgUrl" mode="aspectFill" class="img-class">
      </div>
      <div class="product-info">
        <div class="product-info_item">
          <div>{{productItem.name}}</div>
          <div>{{productItem.price}}</div>
        </div>
        <div class="product-info_item">
          <div>{{productItem.attributeName}}</div>
          <div>{{productItem.quantity}}</div>
        </div>
      </div>
    </div>
    <div class="evaluation-score">
      <van-rate :value="rateValue" />
    </div>
    <div class="evaluation-comment">
      <van-field
        :value="message"
        type="textarea"
        placeholder="请输入留言"
        border="true"
      />
    </div>
    <div class="evaluation-pic">
      <image src="/static/images/upload.png" catchtap="chooseImage" />
    </div>

  </div>
  
</template>

<script>
  export default {
    name: "EvaluationItem",
    data() {
      return {
        rateValue: 0,
        productItem:{
          imgUrl:'https://img1.qunarzz.com/travel/d8/1704/ea/e2c26c442e55e1b5.jpg_480x360x95_e5675a93.jpg',
          name:"杨宇测试",
          price:10.12,
          attributeName:"个",
          quantity:2
        }
      }
    }
  }
</script>

<style scoped>
  .img-class {
    width: 100px;
    height: 100px;
  }
  .evaluation-product-item {
    display: flex;
  }
  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .product-info_item {
    display: flex;
    justify-content:space-around;
  }

</style>
