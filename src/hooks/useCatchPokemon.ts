import { IOnePokemonOfList } from '../interfaces';

const useCatchPokemon = (pokemon: IOnePokemonOfList) => {
  const sessionStoragePokedex = sessionStorage.getItem('pokedex');
  if (sessionStoragePokedex) {
    const pokedex = JSON.parse(sessionStoragePokedex);
    pokedex.push(pokemon);
    sessionStorage.setItem('pokedex', JSON.stringify(pokedex));
  }
};

export default useCatchPokemon;
