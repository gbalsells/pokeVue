<template>
  <div>
    <div class="info h5">
      <div class="info__name">
        <img :src="pokemon.sprites?.other?.dream_world?.front_default" :alt="pokemon.name">
        <h1>{{ pokeName }}</h1>
      </div>
      <div class="info__flex">
        <div v-for="stat in stats" :key="stat.name" class="info__stat">
          <h5>{{ formatText(stat.name).toUpperCase() }}: </h5>
          <div>
            <p>
              Base Stat: {{ stat.base_stat }}
            </p>
            <p>
              Effort: {{ stat.effort }}
            </p>
          </div>
        </div>
      </div>
      <hr>
      <div class="info__flex">
        <div class="info__stat">
          <h5>SPECIES:</h5>
          <div>
            {{ species }}
          </div>
        </div>
        <div class="info__stat">
          <h5>TYPES: </h5>
          <div>
            {{ formattedTypes }}
          </div>
        </div>
        <div class="info__stat">
          <h5>ORDER:</h5>
          <div>
            {{ pokemon.order }}
          </div>
        </div>
        <div class="info__stat">
          <h5>BASE EXPERIENCE: </h5>
          <div>
            {{ pokemon.base_experience }}
          </div>
        </div>
        <div class="info__stat">
          <h5>HEIGHT:</h5>
          <div>
            {{ pokemon.height }}ft
          </div>
        </div>
        <div class="info__stat">
          <h5>WEIGHT: </h5>
          <div>
            {{ pokemon.weight }}lb
          </div>
        </div>
      </div>
    </div>
    <div class="accordion h5" id="accordionExample" v-if="abilities">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
            aria-expanded="true" aria-controls="collapseOne">
            <p class="h5">
              ABILITIES
            </p>
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne">
          <div class="accordion-body">
            {{ abilities }}
          </div>
        </div>
      </div>
      <div class="accordion-item" v-if="Object.keys(locations).length > 0">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <p class="h5">
              LOCATION AREA ENCOUNTERS
            </p>
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo">
          <div class="accordion-body">
            <div class="items">
              <p v-for="location in sortedLocations" :key="location.name" class="item h5">
                {{ formatText(location.location_area.name) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <p class="h5">
              MOVES
            </p>
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree">
          <div class="accordion-body items">
            <p class="h5 item" v-for="move in moves" :key="move.move.name">
              {{ formatText(move.move.name) }}
            </p>
          </div>
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
        abilities: [],
        location_area_encounters: '',
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
    },
    moves() {
      return this.pokemon.moves.sort((a, b) => {
        if (a.move.name < b.move.name) {
          return -1
        }
        if (a.move.name > b.move.name) {
          return 1
        }
        return 0
      })
    },
    sortedLocations() {
      return this.locations.sort((a, b) => {
        if (a.location_area.name < b.location_area.name) {
          return -1
        }
        if (a.location_area.name > b.location_area.name) {
          return 1
        }
        return 0
      })
    }
  },
  created() {
    this.id = this.$route.params.id.toString();
    endpoints.getPokemon(this.id).then((pokemon) => {
      this.pokemon = pokemon
      endpoints.getDefaultEndpoint(this.pokemon.location_area_encounters).then((locations) => {
        Object.keys(locations).forEach((index) => {
          this.locations.push(locations[index])
        })
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

.info__stat h5 {
  text-align: center;
  font-weight: bold;
  background-color: #76808F;
  color: white;
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

.info__stat p,
.info__stat h5,
.info__stat div {
  margin: 0;
  padding: 0.5rem
}

.items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.item {
  text-decoration: none;
  background: #F9F8DA;
  color: black;
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid #76808F;
  transition: 200ms ease;
  cursor: pointer;
}

.item:hover {
  transform: scale(105%);
  box-shadow: 0 0 5px #76808F;
}

.details {
  padding: 2em;
}

hr {
  display: none;
}

.accordion {
  padding: 2em;
  padding-bottom: 0;
  --bs-accordion-active-color: #141619;
}

.accordion-button p {
  font-weight: bold;
}

.accordion-button {
  color: white;
  background-color: #76808F;
}

.accordion-button:not(.collapsed) {
  color: white;
  background-color: #76808F;
}

.accordion-button:focus {
  border-color: black;
  outline: none;
  box-shadow: none;
}

.accordion-button:not(.collapsed)::after {
  background-image: var(--bs-accordion-btn-icon);
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
