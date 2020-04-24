<template>
  <div style="position: relative;  width: 60px;">
      <img v-show="type === 'selected'" src="../asset/Check.png" class="box_image">
    <div class="box_container" :class="{active: type === 'selected'}" @click="selectedSKU">
      <div style="font-size: 13px;">
        {{name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "check-box",
    props: {
      id: 0,
      name: "",
      type: "selected"
    },
    data() {
      return {
      }
    },

    methods: {
      selectedSKU() {
        this.$emit('selectedSKU', this.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box_container {
    position: relative;
    height: 22px;
    font-size: 10px;
    line-height: 20px;
    text-align: center;
    background-color: #f2f2f2;
  }
  .box_container.active {
    background-color: white;
    border: 1px solid black;
  }
  .box_image {
    width: 12px;
    z-index: 1;
    height: 12px;
    position: absolute;
    right: 0;
  }

</style>
