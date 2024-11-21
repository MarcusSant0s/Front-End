import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer';
import SideBar from '../components/SideBar/SideBar'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
       <Header />
    {/*<SideBar />*/}
      <main className='flex-grow'>
        <Outlet /> {/* Onde as páginas específicas serão renderizadas */}
      </main>
    <Footer/>
    </div>
  );
};

export default Layout;
