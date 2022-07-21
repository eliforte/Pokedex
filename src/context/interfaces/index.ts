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
  hp: number;
  attack: number;
  defense: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
  total: number;
  evolutions: string[];
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
  searchPokemon: (search: string) => void;
  getPokemonDetails: (text: string) => void;
  search: string;
  setSearch: (newState: string) => void;
  getPokemons: () => void;
}

export type IChildrenProps = {
  children: React.ReactNode;
};
