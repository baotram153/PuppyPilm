import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AddMovie from './pages/AddMovie';
import MoviePage from './pages/MoviePage';
import About from './pages/About';
import SeeAward from './pages/SeeAward';
import RankPage from './pages/RankPage';
import DefaultLayout from './layout/DefaultLayout';
import UserLayout from './layout/UserLayout';
import AdminLayout from './layout/AdminLayout';

import { RoleSelection } from './pages/RolePage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AdminLogin } from './pages/AdminLogin';
import { AdminSignup } from './pages/AdminSignup';

import { AdminHomepage } from './pages/AdminHomepage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RoleSelection />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="*">
                    <Route exact path="movie" element={<MoviePage />} />
                    <Route exact path="see-award-rate" element={<SeeAward />} />
                    <Route exact path="about" element={<About />} />
                </Route>
                <Route path="admin">
                    <Route path="login" element={<AdminLogin />} />
                    <Route path="signup" element={<AdminSignup />} />
                    <Route path="homepage" element={<AdminHomepage />} />
                    <Route path="add-movie" element={<AddMovie />} />
                    <Route path="rank-page" element={<RankPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
        // <BrowserRouter>
        //     <Routes>
        //         <Route path="/" element={<RoleSelection />} />
        //         <Route path="/homepage" element={<HomePage />} />
        //         <Route path="/login" element={<Login />} />
        //         <Route path="/signup" element={<Signup />} />
        //         <Route path="*" element={<UserLayout />}>
        //             <Route path="movie" element={<MoviePage />} />
        //             <Route path="see-award-rate" element={<SeeAward />} />
        //             <Route path="about" element={<About />} />
        //         </Route>
        //         <Route path="/admin/login" element={<AdminLogin />} />
        //         <Route path="/admin/signup" element={<AdminSignup />} />
        //         <Route path="/admin" element={<AdminLayout />}>
        //                 <Route path="homepage" element={<AdminHomepage />} />
        //                 <Route path="add-movie" element={<AddMovie />} />
        //                 <Route path="rank-page" element={<RankPage />} />
        //         </Route>
        //     </Routes>
        // </BrowserRouter >
    );
}

export default App;
