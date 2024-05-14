<script>
  import AppMain from './components/AppMain.vue';
  import MainHeader from './components/MainHeader.vue';
  let baseEndpoint = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025`
  const basePokemonTypes = 'https://41tyokboji.execute-api.eu-central-1.amazonaws.com/dev/api/v1/pokemons/types1'
  import axios from 'axios';
  import {store} from './assets/data/store.js'

  export default {
    name: 'App',
    components: {
      AppMain, MainHeader
    },
    data() {
      return {
        perPage: 20,
        currentPage: 20,
        currentEndpoint: null,
        firstType: '',
        secondType: '',
        orderType: 'ascending'
      }
    },
    computed: {
    },
    methods: {
      //altra api, pokeApi, più complessa ma meglio per i filtri
      fetchPokemon( endpoint, container, filterData) {
        store.isLoading = true;
        container.length = 0;
        axios.get(endpoint).then(res => {
          
          const promises = res.data.results.map(pokemon => {
            
            return axios.get(pokemon.url).then(r => {
              // console.log(r.data)
              return {
                id: r.data.id,
                name: r.data.name,
                abilities: r.data.abilities,
                height: r.data.height,
                weight: r.data.weight,
                moves: r.data.moves,
                sprites: r.data.sprites,
                types: r.data.types,
              };
            });
          });
          Promise.all(promises)
          .then(pokemonDetail => {
            store.totalCount = res.data.count;
            store.pagination = res.data.next;
            const updatedPokemons = pokemonDetail.map((detail, index) => {
                return {
                    id: detail.id,
                    name: detail.name,
                    url: res.data.results[index].url, 
                    abilities: detail.abilities,
                    height: detail.height,
                    weight: detail.weight,
                    moves: detail.moves,
                    sprites: detail.sprites,
                    types: detail.types
                };
            });
            const filteredPokemons = []
            //gestire gli ordini
            if(this.orderType === 'descending') {
              updatedPokemons.reverse();
            }else if(this.orderType === 'alphabetic up') {
              updatedPokemons.sort((a, b) => a.name.localeCompare(b.name));
            } else if(this.orderType === 'alphabetic down') {
              updatedPokemons.sort((a, b) => b.name.localeCompare(a.name));
            } else if(this.orderType === 'advancedFilter') { //gestire i filtri
              //se ho dei tipi nei filtri
              
              if (filterData.filterPokemonType && filterData.filterPokemonType.length > 0) {
                if(filterData.filterPokemonType.length > 2) {
                  console.log('da sistemare, sono più di due')
                  return
                }
                updatedPokemons.forEach(pokemon => {
                  const lowercaseFilter = filterData.filterPokemonType[0].toLowerCase();
                  const secondLowerCaseFilter = filterData.filterPokemonType[1]?.toLowerCase()
                  const firstPokemonTypeName = pokemon.types[0]?.type.name?.toLowerCase();
                  const secondPokemonTypeName = pokemon.types[1]?.type.name?.toLowerCase();
                  const matchFirstType = lowercaseFilter === firstPokemonTypeName;
                  const matchSecondType = lowercaseFilter === secondPokemonTypeName;
                  if (matchFirstType || matchSecondType){
                    filteredPokemons.push(pokemon)
                  }
                })
                console.log(updatedPokemons)
              } else {
                console.log('non c\'è type')
              }
              
            }
            console.log(filteredPokemons)
            
            //update l'array originale
            if (this.orderType === 'advancedFilter') {
              container.push(...filteredPokemons)
            } else {
              container.push(...updatedPokemons)
            }
            store.pokemons = store.allPokemons.slice(0, 20);
            

        }).catch(err => { }).then(() => {
                setTimeout(() => {
                  store.isLoading = false
                }, 500)
              })
        })
      },
      filterPokemon(option) {
        if(option === 'Ascending order') {
          this.fetchPokemon(baseEndpoint, store.allPokemons);
          this.orderType = 'ascending'
          this.currentPage = 20
        } else if( option === 'Descending order') {
          this.fetchPokemon(baseEndpoint, store.allPokemons)
          this.orderType = 'descending'
          this.currentPage = 20
        } else if (option === 'Alphabetic A-Z') {
          this.orderType = 'alphabetic up'
            this.fetchPokemon(baseEndpoint, store.allPokemons)
          this.currentPage = 20
        } else if (option === 'Alphabetic Z-A') {
          this.orderType = 'alphabetic down'
          this.fetchPokemon(baseEndpoint, store.allPokemons)
          this.currentPage = 20
        } 
      },
        //ottengo dall'api i tipi di pokemon
        fetchTypes() {
          axios.get(basePokemonTypes).then(res => {
            store.isLoading = true
            store.pokemonTypes = res.data
          }).catch(err => {console.log(err)}).then(() => {
            setTimeout(() => {
              store.isLoading = false
            }, 500)
          })

        },
        fetchFilterData(data) {
          // console.log(data)
          this.orderType = 'advancedFilter'
          // const types = data.filterPokemonType;
          // const weaknesses = data.filterPokemonWeakness;
          // const minNumericRange = data.minNumericRange;
          // const maxNumericRange = data.maxNumericRange;
          // const abilityName = data.abilityName;
          // const heights = data.filterHeight;
          // const weights = data.filterWeight;
          // console.log(types, weaknesses, minNumericRange, maxNumericRange, abilityName, heights, weights)

          this.fetchPokemon(baseEndpoint, store.allPokemons, data)
          this.currentPage = 20
        },

        //quando clicco aggiungo tot pokemon in più
        loadMorePokemon() {
          setTimeout(() => {
            // Perform the action
            store.isLoading = true;

            // Stop the action after another second
            setTimeout(() => {
              store.isLoading = false;
            }, 300);
          }, 0);
          this.currentPage = this.currentPage + this.perPage
          store.pokemons = store.allPokemons.slice(0, this.currentPage);
        },
    },
    created() {

      this.currentEndpoint = `${baseEndpoint}${this.perPage}`
      this.fetchPokemon('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025', store.allPokemons)
      
      this.fetchTypes()
      
    },
    
  }
</script>

<template>
  <div class="body">
    <AppMain @type-selected="filterPokemon" @load-button-clicked="loadMorePokemon" @filterFields="fetchFilterData" />
    <span id="anchor"></span>
  </div>
</template>

<style>
@import './assets/style/style.scss';
 
</style>

<!-- bisogna cambiare tutti i container con store.allPokemons e poi lavorare su quelli  -->