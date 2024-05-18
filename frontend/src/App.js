import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Checker from './pages/chat/component/Checker';
import Login from './context/Login.jsx';
import NotFoundPage from './pages/notFoundPages';
import Signup from './context/Signup.jsx';

import { useAuthContext } from './context/index.js';
import MainProvider from './context/MainProvider';

const PrivateRoute = ({ children }) => {
  const authContext = useAuthContext();
  return authContext.data ? children : <Navigate to="/login" />;
};

const App = () => (
  <MainProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(<PrivateRoute><Checker /></PrivateRoute>)} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </MainProvider>
);

export default App;
