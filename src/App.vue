<script>
import AppMain from './components/AppMain.vue';
import MainHeader from './components/MainHeader.vue';
let baseEndpoint = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025`
const basePokemonTypes = 'https://41tyokboji.execute-api.eu-central-1.amazonaws.com/dev/api/v1/pokemons/types1'
import axios from 'axios';
import { store } from './assets/data/store.js'

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
      orderType: 'ascending',
      invalidFilter: []
    }
  },
  computed: {
  },
  methods: {
    //altra api, pokeApi, più complessa ma meglio per i filtri
    fetchPokemon(endpoint, filterData = null) {
      store.isLoading = true;
      store.allPokemons.length = 0;
      this.invalidFilter = []
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
        //aspetto che mi arrivino tutti i dati e raccolgo in un array tutti i pokemon
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
            //gestire l'array di tutti i pokemon in base alla selezione dell'ordine
            if (this.orderType === 'descending') {
              updatedPokemons.reverse();
            } else if (this.orderType === 'alphabetic up') {
              updatedPokemons.sort((a, b) => a.name.localeCompare(b.name));
            } else if (this.orderType === 'alphabetic down') {
              updatedPokemons.sort((a, b) => b.name.localeCompare(a.name));
            } else if (this.orderType === 'advancedFilter') { //gestire i filtri
              //se ho dei tipi nei filtri

              if (filterData.filterPokemonType && filterData.filterPokemonType.length > 0) {
                
                  updatedPokemons.forEach(pokemon => {
                    const lowercaseFilter = filterData.filterPokemonType[0].toLowerCase();
                    const secondLowerCaseFilter = filterData.filterPokemonType[1]?.toLowerCase()
                    const firstPokemonTypeName = pokemon.types[0]?.type.name?.toLowerCase();
                    const secondPokemonTypeName = pokemon.types[1]?.type.name?.toLowerCase();
                    // console.log("primo filtro:", lowercaseFilter);
                    // console.log("secondo filtro:", secondLowerCaseFilter);
                    // console.log("primo tipo pokemon:", firstPokemonTypeName);
                    // console.log("secondo tipo pokemon:", secondPokemonTypeName);
                    const matchFirstType1 = lowercaseFilter === firstPokemonTypeName;
                    const matchSecondType1 = lowercaseFilter === secondPokemonTypeName;
                    const matchFirstType2 = secondLowerCaseFilter === firstPokemonTypeName;
                    const matchSecondType2 = secondLowerCaseFilter === secondPokemonTypeName;
                    // console.log("match del primo tipo scelto con primo tipo pokemon:", matchFirstType1);
                    // console.log("match del primo tipo scelto con secondo tipo pokemon::", matchSecondType1);
                    // console.log("match del secondo tipo scelto con primo tipo pokemon:", matchFirstType2);
                    // console.log("match del secondo tipo scelto con secondo tipo pokemon:", matchSecondType2);
                    const matchBothTypes2 = (matchFirstType1 || matchSecondType1) && (matchFirstType2 || matchSecondType2);
                    // console.log("Match both:", matchBothTypes2);
                    if(filterData.filterPokemonType.length === 1) {
                      console.log('il filtro è solo 1')
                      if (matchFirstType1 || matchSecondType1) {
                        filteredPokemons.push(pokemon)
                      }
                    } else if(filterData.filterPokemonType.length === 2) {
                      console.log('i filtri sono due')
                      if (matchBothTypes2 === true) {
                        filteredPokemons.push(pokemon)
                      }
                    } 
                  })

                  if (filterData.filterPokemonType.length > 2) {
                    console.log('i filtri sono più di due')
                    this.invalidFilter.push('type')
                  }
                  console.log(this.invalidFilter)
                
              } else {
                console.log('non c\'è type')
              }

            }
            // console.log(filteredPokemons)

            //update l'array originale
            if (this.orderType === 'advancedFilter') {
              store.allPokemons = []
              store.allPokemons.push(...filteredPokemons)
            } else {
              store.allPokemons.push(...updatedPokemons)
            }
            if(this.invalidFilter.length > 0){
              store.allPokemons = []
              store.pokemons = []
            } else {
              store.pokemons = store.allPokemons.slice(0, 20);
            }

          }).catch(err => { }).then(() => {
            setTimeout(() => {
              store.isLoading = false
            }, 500)
          })
      })
    },
    filterPokemon(option) {
      if (option === 'Ascending order') {
        this.fetchPokemon(baseEndpoint);
        this.orderType = 'ascending'
        this.currentPage = 20
      } else if (option === 'Descending order') {
        this.fetchPokemon(baseEndpoint)
        this.orderType = 'descending'
        this.currentPage = 20
      } else if (option === 'Alphabetic A-Z') {
        this.orderType = 'alphabetic up'
        this.fetchPokemon(baseEndpoint)
        this.currentPage = 20
      } else if (option === 'Alphabetic Z-A') {
        this.orderType = 'alphabetic down'
        this.fetchPokemon(baseEndpoint)
        this.currentPage = 20
      }
    },
    //ottengo dall'api i tipi di pokemon
    fetchTypes() {
      axios.get(basePokemonTypes).then(res => {
        store.isLoading = true
        store.pokemonTypes = res.data
      }).catch(err => { console.log(err) }).then(() => {
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

      this.fetchPokemon(baseEndpoint, data)
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
    this.fetchPokemon('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025')

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