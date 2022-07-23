import axios from 'axios';
import { ISearchResults } from '../interfaces';

const useGetThumbnails = async (url: string): Promise<ISearchResults> => {
  const {
    data: {
      sprites,
      name,
      types,
      id,
    },
  } = await axios.get(url);
  const type = types[0].type.name;
  const image = sprites.other['official-artwork'].front_default;
  return {
    name,
    type,
    image,
    id,
  };
};

export default useGetThumbnails;
