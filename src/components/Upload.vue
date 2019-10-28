<template>
  <div class="j-pic-upload">
    <div class="j-upload-btn" @click="uploadImg()" :style="{'width':width || '120rpx','height':height || '120rpx'}">
      <span class="j-upload-add">+</span>
    </div>
    <img @click="previewImg(index)" v-for="(src,index) in urls" :key="src" :src="src" :style="{'width':width || '120rpx','height':height || '120rpx'}" class="img" >
  </div>
</template>

<script>

  import {request} from "@/utils/request";


  export default {
    props:["width","height","max","srcs"],
    data(){
      return {
        urls:[]
      }
    },
    mounted(){
      this.urls = this.srcs || [];
    },
    methods:{
      uploadImg(){
        let that = this;
        wx.chooseImage({
          count: that.max || 3,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
            res.tempFilePaths.forEach(v=>{
              that.urls.push(v);
            });
            that.$emit("choosed",{all:that.urls,currentUpload:res.tempFilePaths});
          }
        })
      },
      previewImg(index){
        let that = this;
        wx.showActionSheet({
          itemList:["预览","删除"],
          success: function(res) {
            if(res.tapIndex === 0){
              wx.previewImage({
                current:that.urls[index],
                urls:that.urls
              });
            } else {
              that.urls.splice(index,1);
              //把删除的index通知上层
              that.$emit("delete",index);
            }
          },
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .j-pic-upload{
    padding: 10rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  .j-upload-btn{
    border: 1px dashed #ddd;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 20rpx;
  }
  .j-upload-add{
    font-size: 80rpx;
    font-weight: 500;
    color:#C9C9C9;
  }
  .img{
    margin:10rpx 20rpx 10rpx 0;
  }
</style>

<!--

  使用
    import Upload from "@/components/upload"
    <upload width="120rpx" height="120rpx" max="6" @choosed="choosed" @delete="" :srcs="['/static/img/no-man.png']"></upload>

  Read me
  属性名                 说明                                  举例                    是否必传                     默认                     返回值说明
  width               定义上传按钮和图片展示的宽度              120rpx                    否                        120rpx
  height              定义上传按钮和图片展示的高度              120rpx                    否                        120rpx
  max                 每次最多上传几张图片                      5                         否                         3
  srcs                可以传入一个图片url的数组      :srcs="['/static/img/no-man.png']"   否                         null
  choosed             每次选完图片触发此事件                 @choosed="choosed"           否                         null                返回一个对象，all代表选取的所有图片，currentUpload代表目前选取的图片
  delete              每次删除已选取的图片触发                @delete="deleteImg"         否                         null                  返回所有选取的图片


-->
