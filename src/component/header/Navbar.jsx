import React, { useState } from "react";
import { Link } from "react-router";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const list = [
    { title: "تواصل معانا", link: "#footer" },
    { title: "آراء العملاء", link: "#feedback" },
    { title: "اطلب الآن", link: "/order" }
  ];

  return (
    <nav className="relative">
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          
        >
          <svg
            className="text-white w-8 h-8 ml-4  "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <ul className="hidden md:flex flex-row gap-8 text-xl font-bold text-white p-4">
        {list.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              className="
                relative
                px-4 py-2  
                transition duration-300 ease-in-out 
                hover:scale-105  
                after:absolute after:left-1/2 after:-bottom-2
                after:w-0 after:h-[3px] 
                after:bg-white
                after:rounded-full
                after:transition-all after:duration-400
                after:-translate-x-1/2
                hover:after:w-full
              "
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>

      {isOpen && (
        <ul className="absolute top-14 ml-0  left-0 bg-gradient-to-t from-cyan-950 to-emerald-700 shadow-xl rounded-xl flex flex-col gap-6 p-4 w-48 text-white font-bold md:hidden z-50">
          {list.map((item, index) => (
            <li key={index} className="py-2 px-4 border-b border-white last:border-none rounded-md">
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
