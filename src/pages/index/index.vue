<template>
  <div class="van-tree-select" :style="setMainHeight">
    <scroll-view scroll-y class="van-tree-select__nav">
      <view v-for="(item, index) in items"
            :key="index"
            :data-index="index"
            @click="onClickNav"
            class="van-ellipsis van-tree-select__nitem "
            :class=" index === mainActiveIndex ? 'van-tree-select__nitem--active' : ''"
      >
        {{item.categoryName}}
      </view>
    </scroll-view>

    <scroll-view
      scroll-y
      class="van-tree-select__content"
      :style="setItemHeight"
    >
      <view v-for="(subItem, index) in subItems"
            :key="index"
            @click="onSelectItem"
            class="van-ellipsis van-hairline--bottom van-tree-select__item">
        <card :cardInfo="subItem"
          @popCart="onPopCart"
        ></card>
      </view>
    </scroll-view>

    <cart-pop :popShow="popCartActive" :productSKUs="productSKUs"
              @popUpClose="closeActive" @setStorage="fff"></cart-pop>
  </div>
</template>
<script>
  import {GET_PRODUCT_CATEGORY_URL,GET_CATEGORY_AND_PRODUCT_BRIEF,GET_PRODUCT_SKU_DETAIL_BY_ID,
    GET_PRODUCT_BY_CATEGORY_ID} from '@/utils/api';
  import {request} from "@/utils/request";
  import card from '@/components/card';
  import cartPop from '@/components/cartPop';
  const ITEM_HEIGHT = 260;
  const defaultCategoryAndProductBriefInfo = {
  };
  export default{
    components: {
      card, cartPop
    },
    data() {
      return {
        items:[],
        activeId: '',
        maxHeight: 1000,
        cardInfo: {
        },
        subItems:[],
        mainHeight: 1000,
        itemHeight: 1000,
        isActive:true,
        mainActiveIndex:0,
        popCartActive: false,
        productSKUs:{}
      }
    },
    computed: {
      setMainHeight() {
        return "height:" + this.mainHeight + "px";
      },
      setItemHeight() {
        return "height:" + this.itemHeight + "px";
      }
    },
    watch: {
      popCartActive() {
        console.log("popCartActive", this.popCartActive)
      },
      items() {
        this.updateSubItems();
      },
      maxHeight() {
        this.updateItemHeight(this.subItems);
        this.updateMainHeight();
      },
      mainActiveIndex: 'updateSubItems'
    },
    methods: {
      async getCategoryAndProductBrief() {
        request(
          GET_CATEGORY_AND_PRODUCT_BRIEF,
          'GET',
          {}
        ).then(
          response => {
            this.items = response;
          }
        );
        console.log("this.categoryAndProductBriefInfo: ", this.items);
        this.subItems = this.items[0].briefResultList;
      },

      getProductSkuDetail(data) {
        request(
          GET_PRODUCT_SKU_DETAIL_BY_ID,
          'GET',
          data
        ).then(
          (response) => {
            this.productSKUs = response;
            console.log("this.good productSKUs response", this.productSKUs);
          }
        )
      },
      onSelectItem(event) {
        const { item } = event.currentTarget.dataset;
        this.$emit('click-item', item);
      },
      // 当一个导航被点击时
      onClickNav(event) {
        console.log("event", event)
        this.mainActiveIndex= event.mp.currentTarget.dataset.index || 0
      },
      // 更新子项列表
      updateSubItems() {
        console.log("this.items[this.mainActiveIndex].briefResultLis", this.items[this.mainActiveIndex])
        let children  = this.items[this.mainActiveIndex].briefResultList;
        console.log("children:", children)
        this.updateItemHeight(children);
        return this.subItems = children;
      },
      // 更新组件整体高度，根据最大高度和当前组件需要展示的高度来决定
      updateMainHeight() {
        const maxHeight = Math.max(this.items.length * ITEM_HEIGHT, this.subItems.length * ITEM_HEIGHT);
        // this.set({ mainHeight: Math.min(maxHeight, this.data.maxHeight) });
        this.mainHeight = maxHeight < this.maxHeight ? maxHeight : this.maxHeight;
      },
      // 更新子项列表高度，根据可展示的最大高度和当前子项列表的高度决定
      updateItemHeight(subItems) {
        const itemHeight = Math.min(subItems.length * ITEM_HEIGHT, this.maxHeight);
         this.itemHeight = itemHeight;
      },
      onPopCart(data) {
        this.popCartActive = true;
        console.log("data",data);
        this.getProductSkuDetail(data);
      },
      closeActive() {
        console.log("closeActive")
        this.popCartActive = false;
      },
      fff(data) {
        console.log("waaaaaa",data)
      }
    },
    created() {
      this.getCategoryAndProductBrief();
      console.log("this.items{}", this.items)
    }
    }

</script>

<style scoped>
  .van-tree-select {
    position: relative;
    font-size: 14px;
    -webkit-user-select: none;
    user-select: none
  }

  .van-tree-select__nav {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 15%;
    min-width: 95px;
    background-color: #fafafa
  }

  .van-tree-select__nitem {
    position: relative;
    padding: 0 9px 0 15px;
    line-height: 44px
  }

  .van-tree-select__nitem--active:after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 3.6px;
    background-color: #f44;
    content: ""
  }

  .van-tree-select__nitem--active {
    font-weight: 700;
    background-color: #fff
  }

  .van-tree-select__nitem--disabled {
    color: #999
  }

  .van-tree-select__content {
    width: 75%;
    padding-left: 15px;
    margin-left: 25%;
    background-color: #fff;
    box-sizing: border-box
  }

  .van-tree-select__item {
    position: relative;
    font-weight: 700;
    line-height: 20px
  }

  .van-tree-select__item--active {
    color: #f44
  }

  .van-tree-select__item--disabled {
    color: #999
  }

  .van-tree-select__selected {
    position: absolute;
    top: 0;
    right: 15px;
    bottom: 0;
    height: 24px;
    margin: auto 0;
    line-height: 24px
  }

  .van-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  }

  .van-multi-ellipsis--l2 {
    -webkit-line-clamp: 2
  }

  .van-multi-ellipsis--l2, .van-multi-ellipsis--l3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical
  }

  .van-multi-ellipsis--l3 {
    -webkit-line-clamp: 3
  }

  .van-clearfix:after {
    content: "";
    display: table;
    clear: both
  }

  .van-hairline, .van-hairline--bottom, .van-hairline--left, .van-hairline--right, .van-hairline--surround, .van-hairline--top, .van-hairline--top-bottom {
    position: relative
  }

  .van-hairline--bottom:after, .van-hairline--left:after, .van-hairline--right:after, .van-hairline--surround:after, .van-hairline--top-bottom:after, .van-hairline--top:after, .van-hairline:after {
    content: " ";
    position: absolute;
    pointer-events: none;
    box-sizing: border-box;
    -webkit-transform-origin: center;
    transform-origin: center;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    border: 0 solid #eee
  }

  .van-hairline--top:after {
    border-top-width: 1px
  }

  .van-hairline--left:after {
    border-left-width: 1px
  }

  .van-hairline--right:after {
    border-right-width: 1px
  }

  .van-hairline--bottom:after {
    border-bottom-width: 1px
  }

  .van-hairline--top-bottom:after {
    border-width: 1px 0
  }

  .van-hairline--surround:after {
    border-width: 1px
  }
</style>
