import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from 'flowbite-react';

function App() {
    const [count, setCount] = useState(0);

    return (
        // <Router>
        //     <div className="App">
        //         <Routes>
        //           <Route path="/" />
        //           <Route path="/" />
        //           <Route path="/" />
        //         </Routes>
        //     </div>
        // </Router>
        <button>Click Me</button>
    );
}

export default App;
