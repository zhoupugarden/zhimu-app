<template>
  <div class="address-container">
    <div class="address-info">
      <div class="address-info_road">
        {{addressInfo.road}}
      </div>
      <div class="address-info_number">
        {{addressInfo.number}}
      </div>
      <div class="address-info_contact">
        {{addressInfo.name}} | {{addressInfo.phoneNo}}
      </div>
    </div>
    <div class="address-operation">
      <div class="address-operation_edit">
        <van-icon name="edit" />
      </div>
      <div class="address-operation_remove">
        <van-icon name="delete" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      addressInfo:Object
    },
    data () {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>

  .address-container {
    display: flex;
    background-color: white;
    justify-content: space-between;
    margin-top: 10px;
    height: 100px;
  }
  .address-info {
    display: flex;
    font-size: 14px;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .address-operation {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-right: 10px;
  }

  .address-add-button {
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: white;
    margin-top: 10px;
  }
  .address-add-button_wrap {
    display: flex;
    justify-content: center;
    padding: 10px 10px;
  }
</style>

<style lang="scss">
  .custom-button {
    padding:0 120px !important;
  }
</style>
