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
  IResults,
  IPokemonStats,
} from './interfaces';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

const initialState = {
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
    hp: 0,
    attack: 0,
    defense: 0,
    sp_atk: 0,
    sp_def: 0,
    speed: 0,
    total: 0,
    evolutions: [],
  },
  setPokemon: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: null,
  setError: () => {},
  searchPokemon: () => {},
  getPokemonDetails: () => {},
  search: '',
  setSearch: () => {},
  getPokemons: () => {},
};

export const PokemonContext = createContext<IInitialState>(initialState);

export const PokemonProvider = ({ children }: IChildrenProps) => {
  const [pokemonList, setPokemonList] = useState<IAllPokemon>(initialState.pokemonList);
  const [pokemon, setPokemon] = useState<IPokemon>(initialState.pokemon);
  const [isLoading, setIsLoading] = useState<boolean>(initialState.isLoading);
  const [error, setError] = useState<string | null>(initialState.error);
  const [search, setSearch] = useState<string>(initialState.search);

  const searchPokemon = async (url: string) => {
    const {
      data: {
        sprites,
        types,
        name,
        id,
      },
    } = await api.get(url);
    const type = types[0].type.name;
    const image = sprites.other['official-artwork'].front_default;
    return {
      type,
      image,
      name,
      id,
    };
  };

  const getPokemonDetails = async (nameOrId: string) => {
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
        const result = { [stat.name]: base_stat };
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
        ...allStats,
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

  const getPokemons = async (urlQuery: string | null) => {
    setIsLoading(true);
    try {
      const urlForResquest = urlQuery || 'https://pokeapi.co/api/v2/pokemon?limit=12';
      const { data } = await api.get(urlForResquest);
      const thumbnails = await Promise.all(
        data.results.map(({ url }: IResults) => {
          const newResult = searchPokemon(url)
            .then((image) => ({ ...image }));
          return newResult;
        }),
      );
      const pokemonsWithImages = pokemonList.results.length > 1
        ? [...pokemonList.results, ...thumbnails] : thumbnails;
      setPokemonList({ ...data, results: pokemonsWithImages });
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
    getPokemons(null);
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
    searchPokemon,
    getPokemonDetails,
    search,
    setSearch,
    getPokemons,
  };

  return (
    <PokemonContext.Provider
      value={globalState}
    >
      {children}
    </PokemonContext.Provider>
  );
};
