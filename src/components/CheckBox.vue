<template>
  <div style="position: relative; height: 22px; width: 60px; padding: 5px;">
      <img v-show="type === 'selected'" src="../asset/Check.png" style="width: 12px; z-index: 1;height: 12px; position: absolute;">
    <div class="box_container" :style="selectedObject" @click="selectedSKU">
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
    },
    computed: {
      selectedObject() {

        if (this.type === 'selected') {
          return 'background-color:' + 'white' + ';' + 'border:' + '1px solid black';
        } else {
          return 'background-color:' + '#f2f2f2';
        }

      }
    }

  }
</script>

<style lang="scss" scoped>
  .box_container {
    position: relative;
    /*width: 50px;*/
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
