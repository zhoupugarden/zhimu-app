<template>
  <div class="comment-item-container">
    <div class="avatar-url">
      <img :src="commentItems.avatarUrl" class="avatar-img">
    </div>
    <div class="use-name">
      {{commentItems.userName}}
    </div>
    <div class="product-star">
      <van-rate :value="commentItems.star"/>
    </div>
    <div class="comment-date">
      {{commentItems.commentDate}}
    </div>
    <div class="user-comment">
      {{commentItems.commentContent}}

    </div>
    <div class="merchant-feed-back">
      {{commentItems.feedBackContent}}
    </div>

    <div class="feedback-pics" v-for="(src,index) in commentItems.urls" :key="index">
      <img  :src="src" :style="{'width':width || '120rpx','height':height || '120rpx'}" class="img" >
    </div>
  </div>
  
</template>

<script>
  export default {

    name: "",
    props: {
      // commentItems:Object
    },
    data() {
      return {
        commentItems: {
          avatarUrl:"http://pic4.zhimg.com/50/v2-8fdee93e812b539c2b88cacce3007a94_hd.jpg",
          urls:["http://pic4.zhimg.com/50/v2-8fdee93e812b539c2b88cacce3007a94_hd.jpg"],
          userName:"测试用户",
          star:5,
          commentDate:"2019-09-04",
          commentContent:"必吃榜来拔草啦~嘉善必吃榜来拔草啦~嘉善必吃榜来拔草啦~嘉善必吃榜来拔草啦~嘉善",
          feedBackContent:". 澳大利亚素食者控告邻居烤肉违反住宅法令. 澳大利亚一名妇女正向法院上诉，试图阻止她的邻居在庭院烧烤食物，法院驳回了她的指控"
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comment-item-container {
    position: relative;
    padding-left: 80px;
    margin-top: 15px;
    padding-bottom: 30px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 10px;
  }
  .avatar-url {
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 60px;
  }
  .avatar-img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .comment-date {
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
    height: 20px;
    font-size: 14px;
  }
  .merchant-feed-back {
    background-color: #CFD4DA;
  }
  .img{
    margin:10rpx 20rpx 10rpx 0;
  }

</style>
