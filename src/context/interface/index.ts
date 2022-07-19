export interface Pokemon {
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

export interface AllPokemon {
  count: number;
  next: string;
  previous: string | undefined;
  results: {
    name: string;
    url: string;
  }[];
}
