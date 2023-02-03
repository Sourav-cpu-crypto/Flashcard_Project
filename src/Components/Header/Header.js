import React from 'react';
import logo from "../../assets/logo.jpg";
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div >
      <div className=" py-5 bg-white pl-6  flex justify-center sm:justify-start">
        <img className="w-70 h-10" src={logo} alt="logo"></img>
      </div>
      

      <div className="max-w-[1100px] mx-auto px-3 mt-10">
        <h1 className="text-3xl font-bold flex justify-center sm:justify-start">Create Flashcard</h1>
        <div className="  mt-4 sm:mt-2 text-xl gap-10 mb-1 flex justify-center sm:justify-start sm:gap-5 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
            isActive
            ? "text-red-600 underline underline-offset-8 font-bold"
            : ""
          }
          >
            Create New
          </NavLink>
          <NavLink
            to="/allfcard"
            className={({ isActive }) =>
            isActive
            ? "text-red-600 underline underline-offset-8 font-bold"
            : ""
          }
          >
            My FlashCard
          </NavLink>
        </div>
        <hr></hr>
      </div>
            </div>
   
  );
};

export default Header;

