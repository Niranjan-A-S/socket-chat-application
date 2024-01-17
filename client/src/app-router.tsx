import { FC, createElement, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RegisterPage } from './pages/regitser';
import { LoginPage } from './pages/login';

export const AppRouter: FC = memo(() => (
  <Routes>
    <Route path="register" element={createElement(RegisterPage)} />
    <Route path="login" element={createElement(LoginPage)} />
  </Routes>
));
