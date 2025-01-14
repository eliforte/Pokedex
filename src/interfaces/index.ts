/* eslint-disable no-unused-vars */
import React from 'react';

export interface IPokemon {
  id: number;
  image: string;
  name: string;
  description: string;
  type: string;
  height: number;
  weight: number;
  abilities: string;
  stats: {
    statName: string;
    base_stat: number;
  }[];
  evolutions: IOnePokemonOfList[];
  total: number;
}

export interface IPokemonStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface IAllPokemon {
  count: number;
  next: string;
  previous: string | undefined;
  results: {
    name: string;
    image: string;
    type: string;
    id: number;
  }[];
}

export interface IDescription {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
}

export interface IResults {
  name: string;
  url: string;
}

export interface IInitialState {
  pokemonList: IAllPokemon;
  setPokemonList: (newState: IAllPokemon) => void;
  pokemon: IPokemon;
  setPokemon: (newState: IPokemon) => void;
  isLoading: boolean;
  setIsLoading: (newState: boolean) => void;
  error: string | null;
  setError: (newState: string | null) => void;
  getPokemonDetails: (text: string | undefined) => void;
  search: string;
  setSearch: (newState: string) => void;
  firstRenderPokemons: () => void;
  pokedex: IOnePokemonOfList[];
  setPokedex: (newState: IOnePokemonOfList[]) => void;
}

export type IChildrenProps = {
  children: React.ReactNode;
};

export interface IOnePokemonOfList {
  name: string;
  type: string;
  image: string;
  id: number;
}

export interface IPokemonProps {
  id: any;
  pokemon: {
    name: string;
    image: string;
    type: string;
    id: number;
  },
}

export interface ISearchResults {
  name: string;
  type: string;
  image: string;
  id: number;
}
