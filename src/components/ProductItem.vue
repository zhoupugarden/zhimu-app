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
</style>

<style lang="scss">
  ._van-card {
    width: 100% !important;
  }
</style>
