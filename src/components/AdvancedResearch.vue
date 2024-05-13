<script>
import { store } from '../assets/data/store.js'
import SelectType from './SelectType.vue';
import axios from 'axios';
  export default {
    name: 'AdvancedResearch',
    data() {
        return {
            store,
            isAdvancedResearchOpen: false,
            filterPokemonType: [],
            filterPokemonWeakness: [],
            minNumericRange: 1,
            maxNumericRange: 1025,
            abilityName: null,
            filterHeight: [],
            filterWeight: []
        }
    },
    emits: ['filterFields'],
    components: {SelectType},
    methods: {
        fetchAbilities() {
            axios.get('https://pokeapi.co/api/v2/ability?offset=0&limit=367').then(res => {
                // console.log(res.data.results)

                store.pokemonAbilities = res.data.results.map(ability => {
                    ability.name = ability.name.charAt(0).toUpperCase() + ability.name.slice(1)
                    return (ability.name).split('-').join(' ')
                })

                store.pokemonAbilities = store.pokemonAbilities.sort()
            })

        },
        openAdvancedResearch() {
            this.isAdvancedResearchOpen = !this.isAdvancedResearchOpen;
        },
        fetchAllFilters() {
            console.log('Type: ' + this.filterPokemonType)
            console.log('Weakness: ' + this.filterPokemonWeakness)
            console.log('Numeric range: ' + this.minNumericRange + ' - ' + this.maxNumericRange)
            console.log('Ability: ' + this.abilityName)
            console.log('Heights: ' + this.filterHeight)
            console.log('Weights: ' + this.filterWeight)
        },
        setFilter(filter, array, event, className) {
            if(array.includes(filter)) {
                const index = array.indexOf(filter);
                if(index !== -1) {
                    array.splice(index, 1);
                }
                event.currentTarget.remove(className)
            } else {
                array.push(filter)
                event.target.classList.add(className)
            }
        },
        setFilterType(type, event) {
            if (this.filterPokemonType.includes(type)) {
                const index = this.filterPokemonType.indexOf(type);
                if (index !== -1) {
                    this.filterPokemonType.splice(index, 1);
                }
                event.target.classList.remove('active-filter-type');
            } else {
                this.filterPokemonType.push(type)
                event.target.classList.add('active-filter-type')
            }
        },
        setFilterWeakness(weakness, event) {
            if(this.filterPokemonWeakness.includes(weakness)) {
                const index = this.filterPokemonWeakness.indexOf(weakness);
                if (index !== -1) {
                    this.filterPokemonWeakness.splice(index, 1)
                }
                event.target.classList.remove('active-filter-type');
            } else {
                this.filterPokemonWeakness.push(weakness)
                event.target.classList.add('active-filter-type')
            }
        },
        setHeight(height, event) {
            if (this.filterHeight.includes(height)) {
                const index = this.filterHeight.indexOf(height);
                if (index !== -1) {
                    this.filterHeight.splice(index, 1)
                }
                event.currentTarget.classList.remove('active-filter-height');
            } else {
                this.filterHeight.push(height)
                event.currentTarget.classList.add('active-filter-height')
            }
            
        },
        setWeight(weight, event) {
            if (this.filterWeight.includes(weight)) {
                const index = this.filterWeight.indexOf(weight);
                if (index !== -1) {
                    this.filterWeight.splice(index, 1)
                }
                event.currentTarget.classList.remove('active-filter-height');
            } else {
                this.filterWeight.push(weight)
                event.currentTarget.classList.add('active-filter-height')
            }
            
        },
        getAbility(ability) {
            this.abilityName = ability
        },
        reset() {
            const types = document.querySelectorAll('.abbreviation-filter')
            types.forEach(type => {
                type.classList.remove('active-filter-type')
            })
            const heights = document.querySelectorAll('.heights-container') 
            heights.forEach(height => {
                height.classList.remove('active-filter-height')
            })
            const images = document.querySelectorAll('.dark-img') 
            images.forEach(img => {img.classList.remove('invert')})
            this.filterPokemonType = [];
            this.filterPokemonWeakness = [];
            this.filterHeight = []
            this.filterWeight = []
        }
    },
    created() {
        this.fetchAbilities()
    }
  }
</script>

<template>
    <div class="advanced-container">
        <div class="hidden-research" v-show="isAdvancedResearchOpen">
            <div class="cm-col">
                <section>
                    <div class="d-flex align-items-center gap-5">
                        <h3>Type and weakness</h3>
                        <div class="abbreviation">
                            <span>
                                <strong>T</strong> = Type
                            </span>
                            <span>
                                <strong>W</strong> = Weakness
                            </span>
                        </div>
                    </div>
                    <div>
                        <div class="row">
                            <div class="col-5">
                                <ul>
                                    <li class="type-filter" v-for="(pokemonType, i) in store.pokemonTypes.slice(0,9)"
                                        :key="i">
                                        <span class="pokemon-type-filter" :class="'bg' + pokemonType">{{ pokemonType
                                            }}</span>
                                        <span class="abbreviation-filter"
                                            @click="setFilterType(pokemonType, $event)">T</span>
                                        <span class="abbreviation-filter"
                                            @click="setFilterWeakness(pokemonType, $event)">W</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-5">
                                <ul>
                                    <li class="type-filter" v-for="(pokemonType, i) in store.pokemonTypes.slice(9,18)"
                                        :key="i + 9">
                                        <span class="pokemon-type-filter" :class="'bg' + pokemonType">{{ pokemonType
                                            }}</span>
                                        <span class="abbreviation-filter"
                                            @click="setFilterType(pokemonType, $event)">T</span>
                                        <span class="abbreviation-filter"
                                            @click="setFilterWeakness(pokemonType, $event)">W</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="d-flex align-items-center gap-5">
                        <h3>Numeric range</h3>
                        <div class="d-flex align-items-center gap-3">
                            <input type="text" class="number-range-input" v-model="minNumericRange">
                            <span> - </span>
                            <input type="text" class="number-range-input" v-model="maxNumericRange">
                        </div>
                    </div>
                </section>
            </div>
            <div class="cm-col">
                <section>
                    <h3>Ability</h3>
                    <SelectType :default-label="'Any'" :options="store.pokemonAbilities"
                        @option-selected="getAbility" />
                </section>
                <section>
                    <h3>Height</h3>
                    <div class="d-flex gap-3">

                        <div class="heights-container" @click="setHeight(1, $event)">
                            <img src="../assets/images/height1.png" alt="" class="dark-img height-img"
                                :class="filterHeight.includes(1) ? 'invert' : ''">
                        </div>
                        <div class="heights-container" @click="setHeight(2, $event)">
                            <img src="../assets/images/height2.png" alt="" class="dark-img height-img"
                                :class="filterHeight.includes(2) ? 'invert' : ''">
                        </div>
                        <div class="heights-container" @click="setHeight(3, $event)">
                            <img src="../assets/images/height3.png" alt="" class="dark-img height-img"
                                :class="filterHeight.includes(3) ? 'invert' : ''">
                        </div>
                    </div>
                </section>
                <section>
                    <h3>Weight</h3>
                    <div class="d-flex gap-3">

                        <div class="heights-container" @click="setWeight(1, $event)">
                            <img src="../assets/images/weights.png" class="dark-img weight-img"
                                :class="filterWeight.includes(1) ? 'invert' : ''" />
                        </div>
                        <div class="heights-container" @click="setWeight(2, $event)">
                            <img src="../assets/images/weights2.png" class="dark-img weight-img"
                                :class="filterWeight.includes(2) ? 'invert' : ''" />
                        </div>
                        <div class="heights-container" @click="setWeight(3, $event)">
                            <img src="../assets/images/weights3.png" class="dark-img weight-img"
                                :class="filterWeight.includes(3) ? 'invert' : ''" />
                        </div>
                    </div>
                </section>
                <div class="button-container">
                    <button @click="reset" class="advanced-research-btn secondary-color">Reset</button>
                    <button
                        @click="$emit('filterFields', { filterPokemonType, filterPokemonWeakness, minNumericRange, maxNumericRange, abilityName, filterHeight, filterWeight })"
                        class="advanced-research-btn primary-color"><i
                            class="fa-solid fa-magnifying-glass me-2"></i>Search</button>
                </div>
            </div>
        </div>

        <span class="grey-board" @click="openAdvancedResearch">Advanced research<span class="white-circle">
                <i class="fa-solid " :class="`fa-angle-${isAdvancedResearchOpen ? 'up' : 'down'}`"> </i>

            </span></span>
    </div>
</template>

<style lang='scss' scoped>
 .advanced-container {
     background-color: #616161;
     padding: 2rem 0;
    //  height: 80px;
    //  da sistemare qui 
    //  height: 650px;
     color: white;
     position: relative;
     margin-bottom: 2rem;
 }

 .grey-board {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -43%);
    width: 25%;
    background-color: #616161;
    height: 30px;
    border-radius: 0px 0px 5px 10px;
    display: flex;
    align-items: start;
    justify-content: center;
    cursor: pointer;

    
 }

 .grey-board::before {
    content: url('../assets/images/research-span.png');
    position: absolute;
    left: -29px;
    top: 0px;
    width: 30px;
    height: 30px;
    transform: scaleX(-1);
    transform: scaleY(-1);

 }
 .grey-board::after {
    content: url('../assets/images/research-span.png');
    position: absolute;
    right: -33px;
    top: 0px;
    width: 30px;
    height: 30px;
    transform: rotate(180deg);
    
 }

 .white-circle {
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    margin-left: 10px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
 }


 .hidden-research {
    max-width: 1000px;
    // background-color: red;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: baseline;
    // display: none;
 }

 .cm-col {
    flex-basis: 40%;


    &:first-of-type{
        // background-color: black;
        margin-right: 2rem;
        flex-basis: 60%;
    }
 }

 section  {
    margin: 2rem 0;

    h3 {
        margin: 1rem 0;
    }
 }

 .abbreviation {
    font-size: 14px;
    display: flex;
    gap: 15px;
 }

 .number-range-input {
    width: 75px;
    padding: 5px;
    border-radius: 5px;
    border: 0;
 }



.type-filter {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: .4rem;
 }

 .pokemon-type-filter {
    width: 115px;
    background-color: red;
    padding: 4px 0;
    text-align: center;
    border-radius: 5px;
    border: 2px solid #a2a2a2;
    cursor: pointer;
 }

 .abbreviation-filter {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: end;
    justify-content: center;
    color: black;
    font-weight: bold;
    cursor: pointer;
 }

 .heights-container {
    width: 90px;
    height: 80px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
 }

 .height-img {
    width: 70px;
 }

 .invert {
    filter: invert(100%);
 }

 .weight-img {
    width: 40px;
 }

 .button-container {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 10px;
    margin-right: 3rem;
    padding-top: 2rem;
 }

 .advanced-research-btn {
    padding: 10px 40px;
    border: 0;
    border-radius: 5px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    transition: .2s ease;

    &.secondary-color{
        background-color: #a4a4a4;

        &:hover {
            background-color: #8b8b8b;
        }
    }

    &.primary-color{
        background-color: #ee6b2f;

        &:hover {
            background-color: #da471b;
        }
    }
 }

 .active-filter-type {
    background-color: #30a7d7;
 }
 .active-filter-height{
    background-color: #ee6b2f;
    
 }
</style>