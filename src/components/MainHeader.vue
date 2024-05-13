<script>
  import SelectType from './SelectType.vue';
  import {store} from '../assets/data/store.js'
  export default {
    name: 'MainHeader',
    data() {
        return {
            store,
            orders: ['Descending order', 'Alphabetic A-Z', 'Alphabetic Z-A']
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
                <SelectType :options="orders" :default-label="'Ascending order'" @option-selected="$emit('type-selected', $event)"/>
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