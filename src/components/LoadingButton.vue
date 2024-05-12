<script>
  export default {
    name: 'LoadingButton',
    emits: ['load-button-clicked']
  }
</script>

<template>
  <div id="load-more-container">
        <button @click="$emit('load-button-clicked')" id="load-button">Load more Pokémon</button>
    </div>
</template>

<style scoped>
  #load-more-container {

    text-align: center;
    margin: 3rem 0;

    
    
  }


button {
  padding: 15px 30px;
  margin: 0 auto;
  border: 0;
  border-radius: 10px;
  background-color: #30a7d7;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
      background-color: #3ac1f7
    }
}

</style>