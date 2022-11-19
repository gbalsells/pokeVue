import axios from 'axios';

export default {
  getDefaultEndpoint(endpoint) {
    return axios.get(endpoint).then((info) => {
      return info.data
    })
  },
  getPokemonList(offset) {
    let query = offset > 0 ? `?offset=${offset}&limit=20` : ''
    return axios.get(`https://pokeapi.co/api/v2/pokemon${query}`).then((list) => {
      return list.data
    });
  },
  getPokemon(id) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((pokemon) => {
      return pokemon.data
    });
  },
  getLocationList() {
    return axios.get(`https://pokeapi.co/api/v2/location/`).then((location) => {
      return location.data
    });
  },
  getLocation(id) {
    return axios.get(`https://pokeapi.co/api/v2/location/${id}`).then((location) => {
      return location.data
    });
  },
}