<template>
  <div class="zm-card" >
      <div class="zm-card__thumb" >
        <image
          :src="cardItem.picUrl"
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
        <div class="zm-card__title"> {{cardItem.productName}}</div>

        <div v-if = "cardItem.attributeName" class="zm-card__attr">{{cardItem.attributeName}}</div>
        <div v-else class="zm-card__attr">个</div>

        <slot name="tags"></slot>
        <div class="zm-card__close">
          <van-icon name="close" @click="removeProduct"/>
        </div>
        <div class="zm-card__bottom">
          <view  class="zm-card__price price-class">￥{{ cardItem.salePrice }}</view>
          <view v-if="cardItem.promoteType === 1004"  class="zm-card__origin-price origin-price-class">￥ {{ cardItem.linePrice }}</view>
          <slot name="bottom" />
          <div class="zm-card__stepper">
            <van-stepper
              @plus="increInventory"
              @minus="decreInventory"
              :value="quantity"></van-stepper>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
  export default {
    props: {
      cardItem: Object,
      quantity: Number
    },
    methods: {
      removeProduct() {
        console.log(this.cardItem)
        this.$emit('removeItem', this.cardItem)
      },
      increInventory() {
        console.log(this.cardItem)
        this.$emit('increItem', this.cardItem)
      },
      decreInventory() {
        this.$emit('decreItem', this.cardItem)
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
    background-color: white;
    box-sizing: border-box;
    margin: 5px;
    border-radius: 5px;
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

   &__attr {
    padding: 10px 0px;
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
