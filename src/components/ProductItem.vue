<template>
  <div class="product-item-container">
    <!--限时促销-->
    <div style="width: 100%" v-if="productItemInfo.promote === 1004">
      <div v-if="productItemInfo.attributeValue">
        <van-card
          :num="productItemInfo.quantity"
          :price="productItemInfo.salePrice"
          :desc="productItemInfo.attributeValue + productItemInfo.attributeName"
          :origin-price="productItemInfo.linePrice"
          :title="productItemInfo.name"
          :thumb="productItemInfo.imgUrl"
          custom-class="root-custom-class"
        ></van-card>
      </div>
      <div v-else>
        <van-card
          :num="productItemInfo.quantity"
          :price="productItemInfo.salePrice"
          :desc="productItemInfo.attributeName"
          :origin-price="productItemInfo.linePrice"
          :title="productItemInfo.name"
          :thumb="productItemInfo.imgUrl"
          custom-class="root-custom-class"
        ></van-card>
      </div>
    </div>
    <div style="width: 100%" v-else>
      <div v-if="productItemInfo.attributeValue">
        <van-card
          :num="productItemInfo.quantity"
          :price="productItemInfo.salePrice"
          :desc="productItemInfo.attributeValue + productItemInfo.attributeName"
          :title="productItemInfo.name"
          :thumb="productItemInfo.imgUrl"
          custom-class="root-custom-class"
        ></van-card>
      </div>
      <div v-else>
        <van-card
          :num="productItemInfo.quantity"
          :price="productItemInfo.salePrice"
          :desc="productItemInfo.attributeName"
          :title="productItemInfo.name"
          :thumb="productItemInfo.imgUrl"
          custom-class="root-custom-class"
        ></van-card>
      </div>

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
    height: 110px;
  }

</style>

<style lang="scss">
  ._van-card {
    width: 100% !important;
    margin: 5px;
  }
  .van-card__desc {
    padding: 10px 0px;
  }
</style>
