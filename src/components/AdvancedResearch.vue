<script>
import { store } from '../assets/data/store.js'
import SelectType from './SelectType.vue';
import axios from 'axios';
  export default {
    name: 'AdvancedResearch',
    data() {
        return {
            store,
            isAdvancedResearchOpen: false
        }
    },
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
                                        <span class="abbreviation-filter">T</span>
                                        <span class="abbreviation-filter">W</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-5">
                                <ul>
                                    <li class="type-filter" v-for="(pokemonType, i) in store.pokemonTypes.slice(9,18)"
                                        :key="i + 9">
                                        <span class="pokemon-type-filter" :class="'bg' + pokemonType">{{ pokemonType
                                            }}</span>
                                        <span class="abbreviation-filter">T</span>
                                        <span class="abbreviation-filter">W</span>
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
                            <input type="text" class="number-range-input" value="1">
                            <span> - </span>
                            <input type="text" class="number-range-input" value="1025">
                        </div>
                    </div>
                </section>
            </div>
            <div class="cm-col">
                <section>
                    <h3>Ability</h3>
                    <SelectType :default-label="'Any'" :options="store.pokemonAbilities" />
                </section>
                <section>
                    <h3>Height</h3>
                    <div class="d-flex gap-3">

                        <div class="heights-container">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/595.png"
                                alt="" class="dark-img">
                        </div>
                        <div class="heights-container">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png"
                                alt="" class="dark-img">
                        </div>
                        <div class="heights-container">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png"
                                alt="" class="dark-img">
                        </div>
                    </div>
                </section>
                <section>
                    <h3>Weight</h3>
                    <div class="d-flex gap-3">

                        <div class="heights-container">
                            <img src="../assets/images/weights.png" class="weight-img" />
                        </div>
                        <div class="heights-container">
                            <img src="../assets/images/weights2.png" class="weight-img" />
                        </div>
                        <div class="heights-container">
                            <img src="../assets/images/weights3.png" class="weight-img" />
                        </div>
                    </div>
                </section>
                <div class="button-container">
                    <button class="advanced-research-btn secondary-color">Reset</button>
                    <button class="advanced-research-btn primary-color"><i
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

 .dark-img {
    filter: brightness(0%);
    width: 70px;
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
</style>