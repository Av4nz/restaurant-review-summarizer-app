import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white">
      <div className="container mx-auto p-4 ">
        <div className="text-center">
          &copy; {new Date().getFullYear()} Restaurant Review Summarizer. All
          rights reserved.
        </div>
        <div className="text-center">
          Made with ❤️ by Your Name
        </div>
      </div>
    </footer>
  );
};

export default Footer;
