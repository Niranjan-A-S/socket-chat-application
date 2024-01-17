import { FC, createElement, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RegisterPage } from './pages/regitser';

export const AppRouter: FC = memo(() => (
  <Routes>
    <Route path="register" element={createElement(RegisterPage)} />
  </Routes>
));
