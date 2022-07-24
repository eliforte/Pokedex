/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable camelcase */

import React, {
  createContext, useState, useEffect,
} from 'react';
import axios, { AxiosError } from 'axios';
import {
  IPokemon,
  IAllPokemon,
  IInitialState,
  IChildrenProps,
  IPokemonStats,
  IOnePokemonOfList,
} from '../interfaces';
import InitialState from '../helpers/initalState';
import usePokemonListWithImages from '../hooks/usePokemonListWithImages';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const PokemonContext = createContext<IInitialState>(InitialState);

export const PokemonProvider = ({ children }: IChildrenProps) => {
  const [pokemonList, setPokemonList] = useState<IAllPokemon>(InitialState.pokemonList);
  const [pokemon, setPokemon] = useState<IPokemon>(InitialState.pokemon);
  const [isLoading, setIsLoading] = useState<boolean>(InitialState.isLoading);
  const [error, setError] = useState<string | null>(InitialState.error);
  const [search, setSearch] = useState<string>(InitialState.search);
  const [pokedex, setPokedex] = useState<IOnePokemonOfList[]>(InitialState.pokedex);

  const getPokemonDetails = async (nameOrId: string | undefined) => {
    setIsLoading(true);
    try {
      const {
        data: {
          id,
          name,
          sprites,
          types,
          stats,
          height,
          weight,
          abilities,
        },
      } = await api.get(`/pokemon/${nameOrId}`);
      const { data: { flavor_text_entries } } = await api.get(`/pokemon-species/${nameOrId}`);
      const allStats = stats.map(({ stat, base_stat }: IPokemonStats) => {
        const result = { statName: stat.name, base_stat };
        return result;
      });

      setPokemon({
        id,
        image: sprites.other['official-artwork'].front_default,
        name,
        type: types[0].type.name,
        height,
        weight,
        description: flavor_text_entries[5].flavor_text,
        abilities: abilities[0].ability.name,
        stats: allStats,
        evolutions: [],
        total: allStats.reduce((acc: any, curr: any) => acc + curr.base_stat, 0),
      });
      setIsLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
        setIsLoading(false);
      }
      setIsLoading(false);
    }
  };

  const firstRenderPokemons = async () => {
    setIsLoading(true);
    try {
      const urlForResquest = 'https://pokeapi.co/api/v2/pokemon?limit=12';
      const { data } = await api.get(urlForResquest);
      const pokemonWithThumbnails = await usePokemonListWithImages(data.results);
      setPokemonList({ ...data, results: pokemonWithThumbnails });
      setIsLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
        setIsLoading(false);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    firstRenderPokemons();
  }, []);

  const globalState: IInitialState = {
    pokemonList,
    setPokemonList,
    pokemon,
    setPokemon,
    isLoading,
    setIsLoading,
    error,
    setError,
    getPokemonDetails,
    search,
    setSearch,
    firstRenderPokemons,
    pokedex,
    setPokedex,
  };

  return (
    <PokemonContext.Provider
      value={globalState}
    >
      {children}
    </PokemonContext.Provider>
  );
};
