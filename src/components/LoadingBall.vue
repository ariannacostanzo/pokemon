<script>
  export default {
    name: 'LoadingBall'
  }
</script>

<template>
  <div id="loader-container">Loading...<img src="../assets/images/favicon.png" alt="pokeball" class="loading-ball"></div>
</template>

<style lang="scss" scoped>
  #loader-container {
    display: flex;
    align-items: center;
    justify-content: center;  
    // padding: 2rem 0;
    font-size: 1.4rem;
    color: white;
    font-weight: bold;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: .8);

    .loading-ball {
      width: 100px;
      margin-left: 20px;
    }
  }
</style>