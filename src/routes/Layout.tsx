import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import SideBar from "../components/SideBar/SideBar";

const Layout = () => {
  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-grow p-6">
          <Outlet /> {/* Onde as páginas específicas serão renderizadas */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
