import axios from 'axios';

export default {
  getDefaultEndpoint(endpoint) {
    return axios.get(endpoint).then((info) => {
      return {
        ...info.data
      }
    })
  },
  getPokemonList() {
    return axios.get('https://pokeapi.co/api/v2/pokemon').then((list) => {
      return {
        ...list.data,
      }
    });
  },
  getPokemon(id) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((pokemon) => {
      return {
        ...pokemon.data,
      }
    });
  },
  getLocationList() {
    return axios.get(`https://pokeapi.co/api/v2/location/`).then((location) => {
      return {
        ...location.data,
      }
    });
  },
  getLocation(id) {
    return axios.get(`https://pokeapi.co/api/v2/location/${id}`).then((location) => {
      return {
        ...location.data,
      }
    });
  },
  getItemList() {

  },
  getItem() {

  }
}