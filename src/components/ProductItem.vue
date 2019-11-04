<template>
  <div class="product-item-container">
    <van-card
      :num="productItemInfo.quantity"
      :price="productItemInfo.salePrice"
      :desc="productItemInfo.attributeName"
      :origin-price="productItemInfo.linePrice"
      :title="productItemInfo.productName"
      :thumb="productItemInfo.picUrl"
      custom-class="root-custom-class"
    ></van-card>
    <van-divider />
  </div>

</template>

<script>
  export default {
    props: {
      productItemInfo: Object
    },
    name: ""
  }
</script>

<style lang="scss" scoped>
  .product-item-container {
    display: flex;
    justify-content: space-around;
    background-color: white;
  }
  .img-class {
    width: 100px;
    height: 100px;
  }
  .product-item-info {
    font-weight: bolder;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .product-item-price {
    font-weight: bolder;
    font-size: 16px;
  }
  .product-item-count {
    font-weight: lighter;
    font-size: 14px;
  }
  .product-item-total {
    font-weight: lighter;
    font-size: 14px;
  }
  .root-custom-class {
    background-color: white;
  }
</style>

<style lang="scss">
  ._van-card {
    width: 100% !important;
    margin: 5px;
  }
</style>
