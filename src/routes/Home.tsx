import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {


  return ( 
 
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Home</h1>
 
        </div>
        <p className="mt-4 text-gray-600">
          Bem Vindo
        </p>
      </main>
 
  );
};

export default Home;
