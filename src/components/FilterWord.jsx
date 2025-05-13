import React from "react";
import { useState } from "react";


const FilterWord = ({ children }) => {
  const filterItem = React.Children.toArray(children)[0];
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected(!isSelected);
  };
  
  return (
    <div className={`bg-slate-100 p-4 rounded-full text-slate-700 min-w-36 cursor-pointer text-center border border-slate-300 hover:border-slate-500 ${isSelected ? "bg-slate-200 border-slate-500" : ""}`}
      onClick={handleClick}>
      {filterItem}
    </div>
  );
};

export default FilterWord;
