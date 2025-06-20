import React from "react";
import DiagramComponent from "./DiagramComponent";

const DiagramSection = ({ diagrams = [], labels, colors }) => {
  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto container p-4 space-y-8">
        <div className="flex flex-col gap-8 items-center justify-center">
          {Array.isArray(diagrams) &&
            diagrams.map((data, idx) => (
              <div
                key={labels[idx]}
                className="flex flex-col items-center w-full"
              >
                <div className={`mb-2 font-semibold text-2xl ${colors[idx]}`}>
                  {labels[idx]}
                </div>
                <div
                  className="bg-white shadow rounded-xl p-4 flex items-center justify-center overflow-x-auto h-[500px] w-full cursor-default border"
                  style={{ minWidth: 300, minHeight: 300 }}
                >
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
