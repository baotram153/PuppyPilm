import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddMovie from './pages/AddMovie';
import FilterRate from './pages/FilterRate';
import HomePage from './pages/HomePage';
import About from './pages/About';
import SeeAward from './pages/SeeAward';
import RankPage from './pages/RankPage';
import DefaultLayout from './layout/DefaultLayout';
function App() {
    const [count, setCount] = useState(0);

    return (
        <BrowserRouter>
            <DefaultLayout>
                <Routes>
                    <Route exact path="/" element={<HomePage />}></Route>
                    <Route exact path="homepage" element={<HomePage />}></Route>
                    <Route
                        exact
                        path="add-movies"
                        element={<AddMovie />}
                    ></Route>
                    <Route
                        exact
                        path="filter-rate"
                        element={<FilterRate />}
                    ></Route>
                    <Route
                        exact
                        path="see-award-rate"
                        element={<SeeAward />}
                    ></Route>
                    <Route
                        exact
                        path="rank-page"
                        element={<RankPage />}
                    ></Route>
                    <Route exact path="about" element={<About />}></Route>
                </Routes>
            </DefaultLayout>
        </BrowserRouter>
    );
}

export default App;
