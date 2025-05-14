import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-700 text-slate-50 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-bold cursor-pointer">
          <Link to="/">Review Summarizer</Link>
        </div>
        <ul className="flex space-x-4 text-slate-50">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#">
              Guide
            </a>
          </li>
          <li>
            <a href="#">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
