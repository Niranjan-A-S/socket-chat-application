import { FC, createElement, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChatPage } from './pages/chat';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { NotFoundPage } from './pages/not-found';
import { RegisterPage } from './pages/register';
import { ChatContainer } from './containers/chat';

//TODO: Implement Lazy Loading

export const AppRouter: FC = memo(() => (
  <Routes>
    <Route path="/" element={createElement(HomePage)} />
    <Route path="chat" element={createElement(ChatPage)} />
    <Route path="login" element={createElement(LoginPage)} />
    <Route path="register" element={createElement(RegisterPage)} />
    <Route path="test" element={createElement(ChatContainer)} />
    <Route path="*" element={createElement(NotFoundPage)} />
  </Routes>
));
