import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddMovie from './pages/AddMovie';
import FilterRate from './pages/FilterRate';
import MoviePage from './pages/MoviePage';
import About from './pages/About';
import SeeAward from './pages/SeeAward';
import RankPage from './pages/RankPage';
import DefaultLayout from './layout/DefaultLayout';

import { RoleSelection } from './pages/RolePage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

import { AdminHomepage } from './pages/AdminHomepage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/homepage" element={<HomePage />} />
                <Route exact path="/role-selection" element={<RoleSelection />} />
                <Route exact path="login" element={<Login />} />
                <Route exact path="signup" element={<Signup />} />
                <Route path="*" element={
                    <DefaultLayout>
                        <Routes>
                            <Route exact path="movie" element={<MoviePage />} />
                            <Route exact path="see-award-rate" element={<SeeAward />} />
                            <Route exact path="about" element={<About />} />
                        </Routes>
                    </DefaultLayout>
                }
                />

                <Route path="admin">
                    <Route path="homepage" element={<AdminHomepage />} />
                    <Route path="add-movie" element={<AddMovie />} />
                    <Route path="rank-page" element={<RankPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
