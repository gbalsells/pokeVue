<template>
  <div>
    <div class="info h5">
      <div class="info__name">
        <img :src="pokemon.sprites?.other?.dream_world?.front_default" :alt="pokemon.name">
        <h1>{{pokeName}}</h1>
      </div>
      <div class="info__flex">
        <div v-for="stat in stats" :key="stat.name" class="info__stat">
          <h5>{{formatText(stat.name).toUpperCase()}}: </h5>
          <div>
            <p>
              Base Stat: {{stat.base_stat}} 
            </p>
            <p>
              Effort: {{stat.effort}} 
            </p>
          </div>
        </div>
      </div>
      <hr>
      <div class="info__flex">
        <div class="info__stat">
          <h5>SPECIES:</h5> 
          <div>
            {{species}}
          </div>
        </div>
        <div class="info__stat">
          <h5>TYPES: </h5>
          <div>
          {{formattedTypes}}
          </div>
        </div>
        <div class="info__stat">
          <h5>ORDER:</h5> 
          <div>
          {{pokemon.order}}
          </div>
        </div>
        <div class="info__stat">
          <h5>BASE EXPERIENCE: </h5> 
          <div>
          {{pokemon.base_experience}}
          </div>
        </div>
        <div class="info__stat">
          <h5>HEIGHT:</h5> 
          <div>
          {{pokemon.height}}ft
          </div>
        </div>
        <div class="info__stat">
          <h5>WEIGHT: </h5> 
          <div>
          {{pokemon.weight}}lb
          </div>
        </div>
      </div>
    </div>
    <div class="details">
      <h5>
        <span>Abilities:</span> 
        {{abilities}}
      </h5>
      <div>
        <h5>
          <span>Location Area Encounters: </span> 
        </h5>
        <div class="locations">
          <router-link :to="{name: 'location', params: {id: getLocationId(location.location_area.url)}}" v-for="location in locations" :key="location.name" class="location h5">
            {{formatText(location.location_area.name)}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import endpoints from '../endpoints';
import capitalize from '../formatters'
export default {
  name: "Pokemon",
  data() {
    return {
      id: '',
      pokemon: {
        name: '',
        types: [],
        species: {
          name: ''
        },
        abilities: []
      },
      locations: [],
      stats: []
    }
  },
  computed: {
    pokeName() {
      return capitalize(this.pokemon.name)
    },
    formattedTypes() {
      return this.pokemon.types.map((type) => {
        return capitalize(type.type.name)
      }).join(', ')
    },
    species() {
      return capitalize(this.pokemon.species.name)
    },
    abilities() {
      let abilities = this.pokemon.abilities.map((ability) => {
        return this.formatText(ability.ability.name)
      })
      return abilities.join(', ')
    }
  },
  created() {
    this.id = this.$route.params.id.toString();
    endpoints.getPokemon(this.id).then((pokemon) => {
      this.pokemon = pokemon
      console.log(this.pokemon)
      endpoints.getDefaultEndpoint(this.pokemon.location_area_encounters).then((locations) => {
        this.locations = locations;
      })
      this.stats = pokemon.stats.map((stat) => {
        return {
          name: stat.stat.name,
          base_stat: stat.base_stat,
          effort: stat.effort
        }
      })
    })
  },
  methods: {
    formatText(text) {
      return capitalize(text.split('-').join(' '))
    },
    getLocationId(url) {
      return url.split("/")[6]
    }
  }
};
</script>

<style>
  span {
    font-weight: bold;
  }
  .info {
    padding: 0 2em;
    margin-top: 2em;
    display: grid;
    grid-template-rows: 3em 1fr;
    grid-template-columns: repeat(3, 1fr);
    justify-items: stretch;
    align-items: stretch;
    gap: 2em;
  }
  .info__name {
    grid-row: 1 / span 2;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2em;
    width: 80%;
  }
  .info__stat {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
    box-shadow: 0 0 10px rgb(172, 172, 172);
    transition: 200ms ease;
  }

   .info__stat:hover {
    box-shadow: 0 0 20px rgb(83, 83, 83);
    transform: scale(105%);
   }
  .info__stat h5{
    text-align: center;
    font-weight: bold;
    background-color: #d6d5adbc;
  }
  .info__stat>div {
    display: flex;
    justify-content: space-evenly;
  }
  .info__flex {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-row: 1 / span 2;
  }
  .info__stat p, .info__stat h5, .info__stat div {
    margin: 0;
    padding: 0.5rem
  }
  .locations {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .location {
    text-decoration: none;
    color: black;
    padding: 1rem;
  }
  .details {
    padding: 2em;
  }

  hr {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    .info {
      grid-template-columns: repeat(2, 1fr);
    }
    .info__name {
      grid-column: 1 / span 2;
    }
    .info__flex {
      grid-row: auto;
    }
  }

  @media screen and (max-width: 600px) {
    .info {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .info__name {
      width: 100%;
      margin-bottom: 2em;
    }
    .info__flex {
      gap: 2em;
    }
    .info__stat {
      margin: 0;
    }
    hr {
      display: block;
      margin: 2em 0;
    }
  }
</style>
