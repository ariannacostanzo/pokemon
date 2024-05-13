<script>
  import AppMain from './components/AppMain.vue';
  import MainHeader from './components/MainHeader.vue';
  let baseEndpoint = `https://41tyokboji.execute-api.eu-central-1.amazonaws.com/dev/api/v1/pokemons?per=`
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
        currentPage: 0,
        currentEndpoint: null,
        firstType: '',
        secondType: '',
        initialEndpoint: baseEndpoint,
        orderType: 'ascending'
      }
    },
    computed: {
    },
    methods: {
      //altra api, pokeApi, più complessa ma meglio per i filtri
      fetchPokemon(endpoint, container) {
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

            if(this.orderType === 'descending') {
              updatedPokemons.reverse();
            }else if(this.orderType === 'alphabetic up') {
              updatedPokemons.sort((a, b) => a.name.localeCompare(b.name));
            } else if(this.orderType === 'alphabetic down') {
              updatedPokemons.sort((a, b) => b.name.localeCompare(a.name));
            } 
            

            //update l'array originale
            
            container.push(...updatedPokemons)
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
          this.fetchPokemon('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025', store.allPokemons);
          this.orderType = 'ascending'
        } else if( option === 'Descending order') {
          this.fetchPokemon('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025', store.allPokemons)
          this.orderType = 'descending',
          this.currentPage = 1005
        } else if (option === 'Alphabetic A-Z') {
          this.orderType = 'alphabetic up'
            this.fetchPokemon('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025', store.allPokemons)
            
        } else {
          this.orderType = 'alphabetic down'
          this.fetchPokemon('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025', store.allPokemons)
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
          const types = data.filterPokemonType;
          const weaknesses = data.filterPokemonWeakness;
          const minNumericRange = data.minNumericRange;
          const maxNumericRange = data.maxNumericRange;
          const abilityName = data.abilityName;
          const heights = data.filterHeight;
          const weights = data.filterWeight;
          console.log(types, weaknesses, minNumericRange, maxNumericRange, abilityName, heights, weights)
          //recupero tutti i pokemon
          //filtro per ogni filtro
          //rendo store.pokemon il risultato mostrandone solo 20
        },

        //quando clicco aggiungo tot pokemon in più
        loadMorePokemon() {
          if(this.orderType === 'ascending') {
            this.currentPage = this.currentPage + 20
          } else if (this.orderType === 'descending') {
            this.currentPage = this.currentPage - 20
          }
          const newEndpoint = `https://pokeapi.co/api/v2/pokemon/?offset=${this.currentPage}&limit=20`
          
          axios.get(newEndpoint).then(res => {
            store.isLoading = true;
            let pokemonData = res.data.results
            if (this.orderType === 'descending') {
              pokemonData = pokemonData.reverse()
            }
            const promises = pokemonData.map(pokemon => {

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
                  types: r.data.types
                };
              });
            });
            Promise.all(promises).then(pokemonDetail => {
              if(this.orderType === 'ascending') {
                store.pagination = res.data.next;
              } else {
                store.pagination = res.data.previous
              }
              store.pokemons.push(...pokemonDetail.map((detail, index) => ({
                id: detail.id,
                name: detail.name,
                url: res.data.results[index].url, // Assuming order is maintained
                abilities: detail.abilities,
                height: detail.height,
                weight: detail.weight,
                moves: detail.moves,
                sprites: detail.sprites,
                types: detail.types
              })));
            })
            store.pagination = res.data
            newPokemon.forEach(pokemon => {
              store.pokemons.push(pokemon)
            })
            
            
          }).catch(err => { }).then(() => {
            store.pokemons.forEach(pokemon => {
              // console.log(pokemon.types)
              // console.log(pokemon.sprites.versions.front_default)
            })
            setTimeout(() => {
              store.isLoading = false
            }, 500)
          })
        },
    },
    created() {

      this.currentEndpoint = `${baseEndpoint}${this.perPage}`
      this.fetchPokemon('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1005', store.allPokemons)
      
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