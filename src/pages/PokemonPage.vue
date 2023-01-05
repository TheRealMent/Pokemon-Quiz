<template>
  <div v-if="pokemon">
      <h1>¿Quién es este Pokemon?</h1>

    <PokemonPicture 
    :pokemonId="pokemon.id" 
    :showPokemon="showPokemon"/>
    <PokemonOptions 
    :pokemons="pokemonArr" 
    @selection="checkAnswer($event)" />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{message}}</h2>
      <button @click="newGame">
          Nuevo Juego
      </button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue';
import PokemonOptions from '@/components/PokemonOptions.vue';

import getPokemonOptions from '@/helpers/getPokemonOptions';



export default {

  components: {
    PokemonPicture,
    PokemonOptions
  },
  data(){
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions()
      const randomNumber = Math.floor( Math.random () * 4)
      this.pokemon = this.pokemonArr[randomNumber]
      
    },
    checkAnswer(idPokemonSelected){
        this.showAnswer = true;
        this.showPokemon = true;
        idPokemonSelected == this.pokemon.id ? this.message = `Correcto, ${this.pokemon.name}` : this.message = `Oops, era ${this.pokemon.name}`
     

      
    },
    newGame(){
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemonArr =  [];
      this.pokemon = null;
      this.message = '';
      this.mixPokemonArray()
    }
  },
  created() {
    this.mixPokemonArray()
    
  }
}
</script>

