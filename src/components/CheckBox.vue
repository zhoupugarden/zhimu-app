<template>
  <div style="position: relative; height: 22px; width: 50px; padding: 5px;">
      <img v-show="type === 'selected'" src="../asset/Check.png" style="width: 10px; z-index: 1;height: 10px; position: absolute;">
    <div class="box_container" :style="{ 'background-color':  backGroundColor}" @click="selectedSKU">
      <div>
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
        backGroundColor : "white"
      }
    },

    methods: {
      selectedSKU() {
        this.$emit('selectedSKU', this.id);
      }
    },
    watch: {
      type(val) {
        if (val === 'selected') {
          this.backGroundColor = 'white';
        } else {
          this.backGroundColor = 'lightgrey';
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .box_container {
    position: relative;
    border: 1px solid black;
    width: 50px;
    height: 22px;
    font-size: 10px;
    line-height: 20px;
    text-align: center;
  }
  .box_image {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
  }

</style>
