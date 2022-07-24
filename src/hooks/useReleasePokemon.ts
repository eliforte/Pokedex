import React from 'react';
import { PokemonContext } from '../context/pokemonContext';

const useReleasePokemon = (id: number): () => void => {
  const { setPokedex } = React.useContext(PokemonContext);

  const releasePokemon = () => {
    const sessionStoragePokedex = sessionStorage.getItem('pokedex');
    if (sessionStoragePokedex) {
      const parsedPokedex = JSON.parse(sessionStoragePokedex);
      const newPokedex = parsedPokedex.filter((pok: any) => pok.id !== id);
      sessionStorage.setItem('pokedex', JSON.stringify(newPokedex));
      setPokedex(newPokedex);
    }
  };

  return releasePokemon;
};

export default useReleasePokemon;
