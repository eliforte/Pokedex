import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import Home from './pages/home';
import Pokedex from './pages/pokedex';
import Details from './pages/details';
import theme from './styles/globalStyles';

const App: React.FC = () => (
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/:id" element={<Details />} />
      </Routes>
    </ChakraProvider>
  </BrowserRouter>
);

export default App;
