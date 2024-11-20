import { Avatar, Dropdown, Navbar} from "flowbite-react";
import { useLocation } from "react-router-dom";
import logo from "../assets/img/logo_hcmut.png";

export default function NavBar () {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="https://flowbite-react.com">
                <img src={logo} className="mr-3 h-10 sm:h-20" alt="HCMUT Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">PuppyPilm</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                arrowIcon={false}
                inline
                // label={
                //     <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                // }
                >
                <Dropdown.Header>
                    <span className="block text-sm">Bonnie Green</span>
                    <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                {(() => {
                    if (location.pathname === '/') {
                        return (
                            <Navbar.Link 
                                href="/"
                                active>Home</Navbar.Link>)
                    }
                    else {
                        return (
                            <Navbar.Link 
                                href="/"
                                >Home</Navbar.Link>)
                    }
                })()}
                {(() => {
                    if (location.pathname === '/add-movies') {
                        return (
                            <Navbar.Link 
                                href="/add-movies"
                                active>Add movies</Navbar.Link>)
                    }
                    else {
                        return (
                            <Navbar.Link 
                                href="/add-movies"
                                >Add movies</Navbar.Link>)
                    }
                })()}
                {(() => {
                    if (location.pathname === '/see-award-rate') {
                        return (
                            <Navbar.Link 
                                href="/see-award-rate"
                                active>See award rate</Navbar.Link>)
                    }
                    else {
                        return (
                            <Navbar.Link 
                                href="/see-award-rate"
                                >See award rate</Navbar.Link>)
                    }
                })()}
                {(() => {
                    if (location.pathname === '/about') {
                        return (
                            <Navbar.Link 
                                href="/about"
                                active>About</Navbar.Link>)
                    }
                    else {
                        return (
                            <Navbar.Link 
                                href="/about"
                                >About</Navbar.Link>)
                    }
                })()}
            </Navbar.Collapse>
        </Navbar>
    )
}