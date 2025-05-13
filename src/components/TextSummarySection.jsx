import React from "react";

const TextSummarySection = ({ text }) => {
  return (
    <div className="bg-slate-50 py-8">
      <div>
        <div className="mx-auto container p-4 space-y-8">
          <div className="text-5xl md:text-6xl font-bold text-center flex-col text-slate-950">
            <div>TEXT SUMMARY</div>
          </div>
          <div className="bg-white shadow rounded-xl p-4 flex justify-center text-justify h-auto w-full cursor-default border">
            <p className="text-lg text-gray-700">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSummarySection;
