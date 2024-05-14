<script>
import PokemonCards from '../components/PokemonCards.vue';
import LoadingButton from '../components/LoadingButton.vue';
import LoadingBall from '../components/LoadingBall.vue';
import MainHeader from '../components/MainHeader.vue';
import AdvancedResearch from '../components/AdvancedResearch.vue';
import {store} from '../assets/data/store.js'
  export default {
    name: 'AppMain',
    data() {
      return {
        store,
      }
    },
    components: {
      PokemonCards, LoadingButton, LoadingBall, MainHeader, AdvancedResearch
    },
    emits: ['type-selected', 'load-button-clicked', 'filterFields']
  }
</script>

<template>
  <main>
    <AdvancedResearch @filterFields="$emit('filterFields', $event)" />
    <div class="pokemon-container">
      <MainHeader @type-selected="$emit('type-selected', $event)" />

      <p v-show="!store.isLoading && store.pokemons.length > 0" class="show-result-container">Showing <strong>{{
          store.pokemons.length }}</strong>
        out of <strong>{{ store.totalCount }}</strong> </p>


      <LoadingBall v-if="store.isLoading" />
      <div v-if="store.pokemons.length > 0" class="pokemon-cards-container">
        <PokemonCards />
      </div>
      <div v-if="!store.isLoading && store.allPokemons.length <= 0">
        <h3>
          There are no pokemons with these filter. Remember that pokemon can only have 2 types.
        </h3>
      </div>



      <LoadingButton v-if="!store.isLoading && store.allPokemons.length > 0" @load-button-clicked="$emit('load-button-clicked')" />
    </div>

  </main>
</template>

<style lang="scss" scoped>
@use '../assets/style/style.scss';


  main {
    background-image: url(../assets/images/container_bg.png);
    background-color: white;
    max-width: 1400px;
    margin: 0 auto;
  }
  .pokemon-container {
    margin:  auto;
    padding: 2rem;
    border-radius: 10px;
    max-width: 1100px;
    min-height: 100vh;

  }
  .pokemon-cards-container {
    display: flex;
    flex-wrap: wrap;
    background-color: #f2f2f2;
    margin-bottom: 2rem;
  }

  .show-result-container {
    margin-bottom: 1rem;
  }


</style>