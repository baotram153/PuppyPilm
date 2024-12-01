import { useLocation, Link } from 'react-router-dom';
import { Navbar } from 'flowbite-react';
import logo from '../assets/img/logo_hcmut.png';
import './NavBar.css';

export default function NavBar() {
    const location = useLocation(); // Khai báo useLocation để lấy đường dẫn hiện tại

    return (
        <Navbar fluid rounded>
            <Navbar.Brand>
                <img
                    src={logo}
                    className="mr-3 h-10 sm:h-20 logo"
                    alt="HCMUT Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    PuppyPilm
                </span>
            </Navbar.Brand>

            <Navbar.Collapse>
                <Link
                    to="/"
                    className={`${
                        location.pathname === '/'
                            ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                            : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                    }`}
                >
                    Home
                </Link>
                <Link
                    to="/add-movies"
                    className={`${
                        location.pathname === '/add-movies'
                            ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                            : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                    }`}
                >
                    Add movies
                </Link>
                <Link
                    to="/see-award-rate"
                    className={`${
                        location.pathname === '/see-award-rate'
                            ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                            : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                    }`}
                >
                    See award rate
                </Link>
                <Link
                    to="/about"
                    className={`${
                        location.pathname === '/about'
                            ? 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                            : 'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                    }`}
                >
                    About
                </Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
