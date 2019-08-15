<template>
<div class="van-tree-select" :style="setMainHeight">
  <scroll-view scroll-y class="van-tree-select__nav">
    <view v-for="(item, index) in items"
          :key="index"
          :data-index="index"
          @click="onClickNav"
          class="van-ellipsis van-tree-select__nitem van-tree-select__nitem--active"
          >
      {{item.name}}
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
      <card :cardInfo="cardInfo"></card>
    </view>
  </scroll-view>
</div>
</template>

<script>
  import card from '@/components/card';
  const ITEM_HEIGHT = 44;

  export default {
    name:"self-select",
    components: {
      card
    },
    props: {
      items: Array,
      mainActiveIndex: {
        type: Number,
        value: 0
      },
      activeId: {
        type: [Number, String]
      },
      maxHeight: {
        type: Number,
        value: 300
      }
    },
    data() {
      return {
        cardInfo: {
          headUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565848471012&di=5feca8941bcbe94551ab5a3f47ca7f2e&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F13%2F16%2F45%2F68p58PICJZr_1024.png",
          name:"测试面包",
          englishName:"test bread"
        },
        subItems:[{"name":"1"},{"name":"2"}],
        mainHeight: 1000,
        itemHeight: 1000,
        isActive:false
      }
    },
    computed: {
      setMainHeight() {
        return "height: " + this.mainHeight + "px";
      },
      setItemHeight() {
        return "height: " + this.itemHeight + "px";
      }
    },
    watch: {
      items() {
        this.updateSubItems().then(() => {
          this.updateMainHeight();
        });
      },
      maxHeight() {
        this.updateItemHeight(this.subItems);
        this.updateMainHeight();
      },
      mainActiveIndex: 'updateSubItems'
    },
    methods: {
      // 当一个子项被选择时
      onSelectItem(event) {
        const { item } = event.currentTarget.dataset;
          this.$emit('click-item', item);
      },
      // 当一个导航被点击时
      onClickNav(event) {
        const { index } = event.currentTarget.dataset;
          this.$emit('click-nav', { index });
      },
      // 更新子项列表
      updateSubItems() {
        const { items, mainActiveIndex } = this.data;
        const { children = [] } = items[mainActiveIndex] || {};
        this.updateItemHeight(children);
        return this.subItems = children;
      },
      // 更新组件整体高度，根据最大高度和当前组件需要展示的高度来决定
      updateMainHeight() {
        const { items = [], subItems = [] } = this.data;
        const maxHeight = Math.max(items.length * ITEM_HEIGHT, subItems.length * ITEM_HEIGHT);
        // this.set({ mainHeight: Math.min(maxHeight, this.data.maxHeight) });
        this.mainHeight = maxHeight < this.maxHeight ? maxHeight : this.maxHeight;
      },
      // 更新子项列表高度，根据可展示的最大高度和当前子项列表的高度决定
      updateItemHeight(subItems) {
        const itemHeight = Math.min(subItems.length * ITEM_HEIGHT, this.data.maxHeight);
        return this.itemHeight = itemHeight;
      }
    }

  }
</script>
<style lang="scss" scope>
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
    width: 35%;
    min-width: 120px;
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
    width: 65%;
    padding-left: 15px;
    margin-left: 35%;
    background-color: #fff;
    box-sizing: border-box
  }

  .van-tree-select__item {
    position: relative;
    font-weight: 700;
    line-height: 44px
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
