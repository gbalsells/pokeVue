<template>
  <div class="page">
    <h1>Lista de Pokemons ({{ count }})</h1>
    <div class="list">
      <PokemonCard v-for="pokemon in pokemonList" :name="pokemon.name" :id="pokemon.id" class="list__card" />
    </div>
    <Pagination @navigateTo="navigate" :currentPage="currentPage" :pages="pages" />
  </div>
</template>

<script>
import endpoints from '../endpoints';
import PokemonCard from '../components/PokemonCard.vue';
import Pagination from '../components/Pagination.vue'
export default {
  components: {
    PokemonCard,
    Pagination
  },
  name: "PokemonList",
  data() {
    return {
      count: 0,
      pokemonList: [],
      currentPage: 1,
      pages: []
    }
  },
  created() {
    this.getPokemonList(0).then((result) => {
      this.count = result.count
      this.pages = Math.ceil(this.count / 20);
    });
  },
  methods: {
    getPokemonList(offset) {
      let result = endpoints.getPokemonList(offset).then((list) => {
        this.pokemonList = list.results.map((pokemon) => {
          let id = pokemon.url.split("/")[6]
          // return {
          //   name: pokemon.name,
          //   url: pokemon.url,
          //   id: id
          // }
          return {
            ...pokemon, id
          }
        });
        return list
      })
      return result
    },
    navigate(page) {
      window.scrollTo(0, 0);
      this.currentPage = page
      this.getPokemonList(((page - 1) * 20))
    }
  },
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