import React from "react";
import DiagramComponent from "./DiagramComponent";

const DiagramSection = ({ data }) => {
  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto container p-4 space-y-8">
        <div className="text-5xl md:text-6xl font-bold text-center flex-col text-slate-950">
          <div>DIAGRAM</div>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex items-center justify-center overflow-x-auto h-[600px] w-full cursor-default border">
          <DiagramComponent data = {data}/>
        </div>
      </div>
    </div>
  );
};

export default DiagramSection;
