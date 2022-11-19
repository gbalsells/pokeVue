<template>
  <div class="card" @click="goToPokemonDetails">
    <div class="card__image">
      <img :src="pokeImage" class="card-img-top" :alt="name">
    </div>
    <h4 class="card-title">{{ pokeName }}</h4>
  </div>
</template>

<script>
import capitalize from '../formatters'

export default {
  name: "PokemonCard",
  props: ['name', 'id'],
  computed: {
    pokeName() {
      return capitalize(this.name)
    },
    pokeImage() {
      return `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${this.id}.svg`
    }
  },
  methods: {
    goToPokemonDetails() {
      this.$router.push({ name: 'pokemon', params: { id: this.id } })
    }
  }
};
</script>

<style>
.card__image {
  width: 300px;
  height: 300px;
  object-fit: cover;
  overflow: hidden;
}

.card-img-top {
  width: 300px;
  height: 300px;
}

.card-title {
  margin-top: 40px;
  text-align: center;
}
</style>