import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ children, to, onClick }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (to) {
      navigate(to);
    }
    if (onClick) {
      onClick();
    }
  };
  const buttonName = React.Children.toArray(children)[0];
  return (
    <button onClick={handleClick} className="bg-slate-700 p-4 rounded-full text-white min-w-42 hover:bg-slate-600 cursor-pointer font-semibold">
      {buttonName}
    </button>
  );
};

export default Button;
