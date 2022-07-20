import * as React from 'react';
import { PokemonContext } from '../../context/pokemonContext';
import Sidebar from '../../components/sidebar';

const Home: React.FC = () => {
  const { pokemonList } = React.useContext(PokemonContext);

  return (
    <div>
      <Sidebar />
      {
        pokemonList.results.map((item) => (
          <>
            <p>{item.name}</p>
            <img src={item.image} alt={item.name} />
          </>
        ))
      }
    </div>
  );
};

export default Home;
