import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import Home from './pages/home';
import theme from './styles/globalStyles';

const App: React.FC = () => (
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ChakraProvider>
  </BrowserRouter>
);

export default App;
