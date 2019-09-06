<template>
  <div class="zm-card" >
      <div class="zm-card__thumb" >
        <image
          :src="cardItem.cartItem.url"
          mode="aspectFit"
          lazy-load="true"
          class="zm-card__img thumb-class"
        ></image>
        <slot name="thumb"></slot>
        <van-tag
          v-if="tag"
          mark
          type="danger"
          custom-class="zm-card__tag"
        >
          {{tag}}
        </van-tag>
        </div>
      <div class="zm-card__content">
        <div class="zm-card__title"> {{cardItem.cartItem.productName}}</div>
        <div class="zm-card__attr">{{cardItem.cartItem.attributeName}}</div>
        <slot name="tags"></slot>
        <div class="zm-card__close">
          <van-icon name="close" @click="removeProduct"/>
        </div>
        <div class="zm-card__bottom">
          <view  class="zm-card__price price-class">￥{{ cardItem.cartItem.salePrice }}</view>
          <view  class="zm-card__origin-price origin-price-class">￥ {{ cardItem.cartItem.linePrice }}</view>
          <slot name="bottom" />
          <div class="zm-card__stepper">
            <van-stepper
              disable-input="true"
              @plus="increInventory"
              :value="cardItem.inventory"></van-stepper>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
  export default {
    props: {
      cardItem: Object
    },
    methods: {
      removeProduct() {
        console.log(this.cardItem.cartItem)
        this.$emit('removeItem', this.cardItem.cartItem)
      },
      increInventory() {
        console.log(this.cardItem.cartItem)
        this.$emit('increItem', this.cardItem.cartItem)
      }
    }

  }
</script>
<style lang="less"  scoped>
  .zm-card {
    position: relative;
    padding: 5px 15px;
    font-size: 12px;
    /*color: @text-color;*/
    color: #34495e;
    /*background-color: @background-color-light;*/
    background-color: #fafafa;
    box-sizing: border-box;
    display:flex;

  &__thumb {
     position: relative;
     width: 90px;
     height: 90px;
     margin-right: 10px;
     flex: none;

  &:empty {
     display: none;
   }
  }
  &__img {
     width: 100%;
     height: 100%;
   }
  &__stepper {
    display: inline-block ;
     float: right;
   }

  &__close {
     position: absolute;
     top: 2px;
     right: 0;
   }
   &__content {
      position: relative;
      min-width: 0; /* hack for flex box ellipsis */
      flex: 1;
    }

  &__price {
     display: inline-block;
     font-weight: bold;
     color: red;
   }

  &__origin-price {
     display: inline-block;
     margin-left: 5px;
     font-size: 10px;
     color: gray;
     text-decoration: line-through;
   }
  &__bottom {
     line-height: 20px;
   }

  &__title {
     font-weight: bold;
     line-height: 16px;
   }

  &__desc {
     line-height: 20px;
     color: gray;
   }

  }


</style>

<style lang="less">
  .zm-card__tag {
    position: absolute;
    top: 2px;
    left: 0;
  }

</style>
