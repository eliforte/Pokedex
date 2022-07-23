import React from 'react';
import axios, { AxiosError } from 'axios';
import usePokemonListWithImages from './usePokemonListWithImages';
import { PokemonContext } from '../context/pokemonContext';

const useInfinitScroll = (): () => void => {
  const {
    setPokemonList,
    setIsLoading,
    pokemonList,
    setError,
  } = React.useContext(PokemonContext);

  const infitiScroll = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(pokemonList.next);
      const newPokemonList = await usePokemonListWithImages(data.results);
      setPokemonList({ ...data, results: [...pokemonList.results, ...newPokemonList] });
      setIsLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
        setIsLoading(false);
      }
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return infitiScroll;
};

export default useInfinitScroll;
