import * as React from 'react';
import { PokemonContext } from '../../context/pokemonContext';
import Sidebar from '../../components/sidebar';
import DrawerMenu from '../../components/drawer';

const Home: React.FC = () => {
  const { pokemonList } = React.useContext(PokemonContext);

  return (
    <div>
      <Sidebar />
      <DrawerMenu />
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
