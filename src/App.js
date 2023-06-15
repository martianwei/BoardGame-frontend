import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import WelcomePage from './components/Welcome';
import GameBoardPage from './components/GameboardPage';
import SignupPage from './components/SignUp';
import { InfoProvider } from './containers/hooks/useInfo';


const App = () => {
    return (
        <BrowserRouter>
            <InfoProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/game" element={<GameBoardPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </InfoProvider>
        </BrowserRouter>
    );
};

export default App;