<template>
  <div class="myaddress-container">
    <zhimu-address v-for="(item, index_) in addressArray"
             :addressInfo="item" :key="index"></zhimu-address>
  </div>
</template>
<script>
  import ZhimuAddress from '@/components/ZhimuAddress';

  export default {
  components: {
    ZhimuAddress
  },
  data() {
    return {
      active:"123",
      addressE: {
        road:"上海市浦东新区周浦镇印象春城",
        number:"75号701",
        name:"杨宇",
        phoneNo:"13817409664"
      },
      addressArray:[
        {
          road:"上海市浦东新区周浦镇印象春城",
          number:"75号701",
          name:"杨宇",
          phoneNo:"13817409664"
        },
        {
          road:"上海市浦东新区周浦镇印象春城",
          number:"75号701",
          name:"杨宇",
          phoneNo:"13817409664"
        }

      ]

    }

  },
  methods: {
    onChange(event) {
      console.log(event)
    }
  }

}
</script>

<style lang="scss" scoped>


</style>
<style lang="scss">

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
