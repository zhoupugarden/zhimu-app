<template>
  <div class="myaddress-container">

  </div>

</template>

<script>
  export default {

  components: {
  },

  data() {
    return {
      active:0

    }

  },
  methods: {
    onChange(event) {
      console.log(event)

    }
  }

}
</script>

<style scoped>
  page {
    height: 100%;
  }

  .order-container {
    position: relative;
    width: 100%;
    height:100%;
  }
  .order-list {
  }
</style>
<style lang="scss">
  .van-tabs__custom {
    width: 100%;
    height: 100%;
  }
</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
