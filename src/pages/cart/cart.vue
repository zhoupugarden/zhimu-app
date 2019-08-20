<template>
  <div class="cart-container">

    <cart-card
      :thumbUrl="good.url"
      :tag="good.tag"
      :price="good.price"
      :originPrice="good.originPrice"
      :title="good.title"
      :attribute="good.attribute"
    >
    </cart-card>


  </div>

</template>

<script>

  import cartCard from '@/components/cartCard';


export default {

  components: {
    cartCard
  },

  data() {
    return {
      good : {
        url: "https://upload-images.jianshu.io/upload_images/5804947-f12ec57c3896fb75.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/632/format/webp",
        name:"yangyu测试",
        tag:"热销",
        price:"10.12",
        originPrice:"100",
        title:"杨宇测试",
        attribute:"1个"
      }
    }

  },



}
</script>

<style lang="scss" scoped>
  .cart-close {
    background-color: red;
  }
</style>

