/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext, useState, useEffect,
} from 'react';
import axios, { AxiosError } from 'axios';
import {
  IPokemon, IAllPokemon, IInitialState, IChildrenProps, IResults,
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
      url: '',
      image: '',
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
};

export const PokemonContext = createContext<IInitialState>(initialState);

export const PokemonProvider = ({ children }: IChildrenProps) => {
  const [pokemonList, setPokemonList] = useState<IAllPokemon>(initialState.pokemonList);
  const [pokemon, setPokemon] = useState<IPokemon>(initialState.pokemon);
  const [isLoading, setIsLoading] = useState<boolean>(initialState.isLoading);
  const [error, setError] = useState<string | null>(initialState.error);

  const getPokemonImage = async (url: string) => {
    const { data: { sprites } } = await api.get(url);
    const image = sprites.other['official-artwork'].front_default;
    return image;
  };

  const getPokemons = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/pokemon');
      const thumbnails = await Promise.all(
        data.results.map((item: IResults) => {
          const newResult = getPokemonImage(item.url)
            .then((image) => ({ ...item, image }));
          return newResult;
        }),
      );
      setPokemonList({ ...data, results: thumbnails });
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
        setIsLoading(false);
      }
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPokemons();
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
  };

  return (
    <PokemonContext.Provider
      value={globalState}
    >
      {children}
    </PokemonContext.Provider>
  );
};
