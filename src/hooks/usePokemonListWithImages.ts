import { IResults, ISearchResults } from '../interfaces';
import useGetThumbnails from './useGetThumbnails';

const usePokemonListWithImages = async (results: IResults[]): Promise<ISearchResults[]> => {
  const pokemonWithImagens = await Promise.all(
    results.map(({ url }: IResults) => {
      const newInfosPokemons = useGetThumbnails(url);
      return newInfosPokemons;
    }),
  );
  return pokemonWithImagens;
};

export default usePokemonListWithImages;
