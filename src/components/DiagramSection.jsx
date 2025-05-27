import React from "react";
import DiagramComponent from "./DiagramComponent";

const labels = ["Positive", "Negative", "Neutral"];
const colors = ["text-green-700", "text-red-700", "text-gray-700"];

const DiagramSection = ({ diagrams = [] }) => {
  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto container p-4 space-y-8">
        <div className="text-5xl md:text-6xl font-bold text-center flex-col text-slate-950">
          <div>DIAGRAM</div>
        </div>
        <div className="flex flex-col gap-8 items-center justify-center">
          {Array.isArray(diagrams) && diagrams.map((data, idx) => (
            <div key={labels[idx]} className="flex flex-col items-center w-full">
              <div className={`mb-2 font-semibold text-2xl ${colors[idx]}`}>{labels[idx]}</div>
              <div className="bg-white shadow rounded-xl p-4 flex items-center justify-center overflow-x-auto h-[500px] w-full cursor-default border"
                style={{ minWidth: 300, minHeight: 300 }}>
                <DiagramComponent data={data || []} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiagramSection;
