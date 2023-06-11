import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import WelcomePage from './components/Welcome';
import GameBoardPage from './components/GameboardPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/game" element={<GameBoardPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;