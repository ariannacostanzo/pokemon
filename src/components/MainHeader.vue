<script>
  import SelectType from './SelectType.vue';
  import {store} from '../assets/data/store.js'
  export default {
    name: 'MainHeader',
    data() {
        return {
            store,
        }
    },
    components: {
        SelectType
    },
    emits: ['type-selected']
    
  }
</script>

<template>
    
    <div>
        <h1>Pokédex</h1>
        <div class="select-container">
            <!-- <label> First Type:</label>
            <SelectType :options="store.pokemonTypes" :default-label="'All'"
                @option-selected="$emit('type-selected', $event)" :type="'firstType'" />
            <label> Second Type:</label>
            <SelectType :options="store.pokemonTypes" :default-label="'All'"
                @option-selected="$emit('type-selected', $event)" :type="'secondType'" /> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>



div {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 2rem;
}

.select-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}
  
    
</style>