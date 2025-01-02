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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="*" element={
                    <DefaultLayout>
                        <Routes>
                            <Route exact path="movie" element={<MoviePage />} />
                            <Route exact path="add-movies" element={<AddMovie />} />
                            <Route exact path="filter-rate" element={<FilterRate />} />
                            <Route exact path="see-award-rate" element={<SeeAward />} />
                            <Route exact path="rank-page" element={<RankPage />} />
                            <Route exact path="about" element={<About />} />
                        </Routes>
                    </DefaultLayout>
                }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
