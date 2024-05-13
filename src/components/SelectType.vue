<script>
  
  export default {
    name: 'SelectType',
    data() {
        return {
          optionSelected: this.defaultLabel || 'All'
        }
    },
    emits: ['option-selected'],
    props: {
      options: Array,
      defaultLabel: String,
    }
  }
</script>

<template>
  <div class="select-container">

    <select @change="$emit('option-selected', optionSelected)" v-model="optionSelected">
      <option :value="defaultLabel">  {{ defaultLabel
        }}</option>
    <option v-for="(option, i) in options" :key="i" :value="option"> {{ option }}</option>
  </select>
</div>
</template>

<style lang="scss" scoped>
  select {
    padding:  10px 15px;
    background-color: #313131;
    color: white;
    position: relative;
    width: 300px;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
    padding-left: 45px;

    &:focus-visible {
      outline: 0;
    }
  }

  .select-container {
    margin: 0;
    position: relative;

    &::after {
      // content: url('../assets/images/pokeball_white.jpg');
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      background-image: url('../assets/images/pokeball_white.jpg');
      background-size: contain;
      left: 10px;
      top: 50%;
      transform: translate( 0, -50%);
    }
  }
  
</style>