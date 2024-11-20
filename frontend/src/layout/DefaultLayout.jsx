import NavBar from './NavBar';

const DefaultLayout = ({ children }) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
};

export default DefaultLayout;
