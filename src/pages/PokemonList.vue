<template>
  <div>
    <h1>Lista de Pokemons</h1>
    <div class="list">
      <PokemonCard v-for="pokemon in pokemonList" :key="pokemon" :name="pokemon.name" :id="pokemon.id" class="list__card"/>
    </div>
  </div>
</template>

<script>
import endpoints from '../endpoints';
import PokemonCard from '../components/PokemonCard.vue';
export default {
  components: {
    PokemonCard
  },
  name: "PokemonList",
  data() {
    return {
      pokemonList: [],
    }
  },
  created() {
    endpoints.getPokemonList().then((list) => {
      this.pokemonList = list.results.map((pokemon) => {
        let id = pokemon.url.split("/")[6]
        return {
          ...pokemon, id
        }
      });
    })
  }
};
</script>

<style scoped>
.list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 80px;
  margin-top: 40px;
}

.list__card {
  min-width: 340px;
  padding: 30px;
  transition: 200ms ease;
  cursor: pointer;
}

.list__card:hover {
  box-shadow: 0 0 40px gray;
  transform: scale(105%);
}
</style>