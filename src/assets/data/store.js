import {reactive} from 'vue';

export const store = reactive({
    pokemons: [],
    isLoading: false,
    pagination: [],
    pokemonTypes: [],
    pokemonAbilities: [],
    totalCount: 0,
    allPokemons: []
    
})