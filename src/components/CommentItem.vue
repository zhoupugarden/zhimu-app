<template>
  <div class="comment-item-container">
    <div class="avatar-url">
      <img :src="detail.avatarUrl" class="avatar-img">
    </div>
    <div class="use-name">
      {{commentItems.userName}}
    </div>
    <div class="product-star">
      <van-rate :value="detail.overAllScore"/>
    </div>
    <div>
      <van-icon name="bookmark-o" color="E0E0E0" />
      {{tagStr}}
    </div>
    <div class="comment-date">
      {{detail.commentDate}}
    </div>
    <div class="user-comment">
      {{detail.content}}

    </div>
    <div class="merchant-feed-back">
      {{detail.reply}}
    </div>

    <div class="feedback-pics" v-for="(src,index) in detail.picUrls" :key="index">
      <img  :src="src" :style="{'width':width || '120rpx','height':height || '120rpx'}" class="img" >
    </div>
  </div>
  
</template>

<script>
  export default {

    name: "",
    props: {
      detail:Object
    },
    data() {
      return {
      }
    },
    computed: {
      tagStr() {
        let tagStr = "";
        let tags = this.detail.contentTags;
        for (let tag of tags) {
          tagStr = tag + ",";
        }
        return tagStr.slice(0,-1);
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
