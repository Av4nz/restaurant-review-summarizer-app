import React from "react";
import Button from "./Button";
import FilterWord from "./FilterWord";

const FilterSection = ({ onApplySummarize }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50">
      <div className="container p-4 space-y-8">
        <div className="text-5xl md:text-6xl font-bold text-center flex-col text-slate-950">
          <div>WORD FILTER</div>
        </div>
        <div className="text-center text-slate-950">
          <p>
            Pick some words to filter. You can either input your word to the
            input field or pick some available words.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <input
            className="bg-white border border-black rounded-full h-14 p-4 w-full md:w-[75%]"
            type="text"
            placeholder="Nasi Goreng,Bakso"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <FilterWord>Bakso</FilterWord>
          <FilterWord>Nasi Goreng</FilterWord>
          <FilterWord>Mie Goreng</FilterWord>
          <FilterWord>Rendang</FilterWord>
          <FilterWord>Nasi Goreng Spesial</FilterWord>
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={onApplySummarize}>Summarize</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
