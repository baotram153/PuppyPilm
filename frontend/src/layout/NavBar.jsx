import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../assets/img/logo_hcmut.png';
import './NavBar.css';

export default function NavBar() {
    // const location = useLocation();

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
                {(() => {
                    if (location.pathname === '/') {
                        return (
                            <Navbar.Link href="/" active>
                                Home
                            </Navbar.Link>
                        );
                    } else {
                        return <Navbar.Link href="/">Home</Navbar.Link>;
                    }
                })()}
                {(() => {
                    if (location.pathname === '/add-movies') {
                        return (
                            <Navbar.Link href="/add-movies" active>
                                Add movies
                            </Navbar.Link>
                        );
                    } else {
                        return (
                            <Navbar.Link href="/add-movies">
                                Add movies
                            </Navbar.Link>
                        );
                    }
                })()}
                {(() => {
                    if (location.pathname === '/see-award-rate') {
                        return (
                            <Navbar.Link href="/see-award-rate" active>
                                See award rate
                            </Navbar.Link>
                        );
                    } else {
                        return (
                            <Navbar.Link href="/see-award-rate">
                                See award rate
                            </Navbar.Link>
                        );
                    }
                })()}
                {(() => {
                    if (location.pathname === '/about') {
                        return (
                            <Navbar.Link href="/about" active>
                                About
                            </Navbar.Link>
                        );
                    } else {
                        return <Navbar.Link href="/about">About</Navbar.Link>;
                    }
                })()}
            </Navbar.Collapse>
        </Navbar>
    );
}
