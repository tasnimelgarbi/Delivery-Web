import React from 'react'
import Navbar from './Navbar'

const Header = () => {
return (
  <header className="bg-cyan-950 shadow-lg flex justify-between items-center rounded-xl m-2" style={{ boxShadow: "0 10px 25px 0 rgba(255,255,255,0.2)", textShadow: "5px 7px 3px #000" }}>
    <div className="flex items-center gap-3 p-4">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/2830/2830305.png" 
        alt="Logo" 
        className="w-12 h-12"
      />
      <h1 className="text-2xl font-bold text-white">شركة توصيل</h1>
    </div>
    <Navbar />
  </header>
)

}

export default Header
