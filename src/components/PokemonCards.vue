<script>
  import {store} from '../assets/data/store.js'
  export default {
    name: 'PokemonCards',
    data() {
        return {
            store,
            data() {
                typeName
            }
        }
    },
    methods: {
        makeTypeNameUpper(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
    },
    created() {

    }
  }
</script>

<template>

    <!-- <div v-for="(pokemon, i) in store.pokemons" :key="pokemon.id" class="pokemon-card">
        <figure class="pokemon-img-container">
            <img :src="pokemon.imageUrl" :alt="pokemon.name" class="pokemon-img">
        </figure>
        <div class="pokemon-info">
            <p class="pokemon-number">N ° {{i+1}}</p>
            <h3 class="pokemon-name">{{ pokemon.name }}</h3>
            <span class="pokemon-type" :class="`bg${pokemon.type1}`">{{pokemon.type1}}</span>
            <span v-if="pokemon.type2" class="pokemon-type" :class="`bg${pokemon.type2}`">{{pokemon.type2}}</span>
        </div>
        
    </div> -->
    <div v-for="(pokemon, i) in store.pokemons" :key="i" class="pokemon-card">
        <figure class="pokemon-img-container">
            <img :src="pokemon.sprites.versions['generation-v']['black-white'].animated.front_default"
                :alt="pokemon.name" class="pokemon-img">
        </figure>
        <div class="pokemon-info">
            <p class="pokemon-number">N ° {{pokemon.id}}</p>
            <h3 class="pokemon-name">{{ pokemon.name }}</h3>
            <span class="pokemon-type" :class="`bg${makeTypeNameUpper(pokemon.types[0].type.name)}`">{{
                pokemon.types[0].type.name
                }}</span>
            <span v-if="pokemon.types[1]" class="pokemon-type"
                :class="`bg${makeTypeNameUpper(pokemon.types[1].type.name) }`">{{
                pokemon.types[1].type.name
                || '' }}</span>
        </div>

    </div>

</template>

<style lang="scss" scoped>
@use '../assets/style/style.scss';
@use '../assets/style/colors' as *;
  .pokemon-card {
    
    flex-basis: 25%;
    padding: 1.5rem .7rem;
    background-color: #f2f2f2;
    cursor: pointer;
    transition: .2s ease;

    &:hover {
        translate: 0 -10px;
    }

    .pokemon-img-container {
        width: 236.63px;
        height: 236.63px;
        background-color: white;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .pokemon-img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        object-fit: contain;
        object-position: center;

       
    }

    .pokemon-info {
        padding: 0 1rem;

        .pokemon-number {
            color: $grey;
            
            font-size: .9rem;
            margin-top: .3rem;
        }

        .pokemon-name {
            font-size: 1.5rem;
            text-transform: capitalize;
            margin-top: .4rem;
            font-weight: 500;
            margin-bottom: .5rem;
        }

        .pokemon-type {
            margin-right: 10px;
            padding: 2px 20px;
            font-size: .9rem;
            border-radius: 6px;
            color: white;
        }

    }

    

  }
</style>