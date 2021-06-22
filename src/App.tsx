import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './routes';
import { AuthContextProvider } from './contexts/authContext';
import GlobalStyles from './styles/global';

const App: FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
