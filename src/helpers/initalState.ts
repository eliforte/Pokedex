const InitialState = {
  pokemonList: {
    count: 0,
    next: '',
    previous: '',
    results: [{
      name: '',
      image: '',
      type: '',
      id: 0,
    }],
  },
  setPokemonList: () => {},
  pokemon: {
    id: 0,
    image: '',
    name: '',
    description: '',
    type: '',
    height: 0,
    weight: 0,
    abilities: '',
    stats: [{
      statName: '',
      base_stat: 0,
    }],
    total: 0,
    evolutions: [],
  },
  setPokemon: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: '',
  setError: () => {},
  getPokemonDetails: () => {},
  search: '',
  setSearch: () => {},
  firstRenderPokemons: () => {},
  pokedex: [],
  setPokedex: () => {},
};

export default InitialState;
