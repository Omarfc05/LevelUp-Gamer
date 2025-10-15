
import { Footer } from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';




export const Layout = () => {
  return (
    <>
    <Navbar/>
     <main style={{ minHeight: "70vh"}}>
        <Outlet/>
        </main>
        <Footer/>
    </>
  );
};
