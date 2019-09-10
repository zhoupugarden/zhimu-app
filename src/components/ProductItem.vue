<template>
  <div class="product-item-container">
    <div class="product-item-url">
      <img :src="productItemInfo.cartItem.url" class="img-class">
    </div>
    <div class="product-item-info">
      <div>
        {{productItemInfo.cartItem.productName}}
      </div>
      <div>
        {{productItemInfo.cartItem.attributeName}}
      </div>
    </div>
    <div class="product-item-price">
      ￥{{productItemInfo.cartItem.salePrice}}
    </div>

    <div class="product-item-count">
      *{{productItemInfo.inventory}}
    </div>
    <div class="product-item-total">
      {{productItemInfo.inventory * productItemInfo.salePrice}}
    </div>

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
