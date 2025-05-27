import React from "react";

const TextSummarySection = ({ summaries, labels, colors }) => {
  return (
    <div className="bg-slate-50 py-8">
      <div>
        <div className="mx-auto container p-4 space-y-8">
          <div className="flex flex-col gap-8 items-center justify-center">
            {summaries.map((summary, idx) => (
              <div
                key={labels[idx]}
                className="flex flex-col items-center w-full"
              >
                <div className={`mb-2 font-semibold text-2xl ${colors[idx]}`}>
                  {labels[idx]}
                </div>
                <div className="bg-white shadow rounded-xl p-4 flex justify-center text-justify h-auto w-full cursor-default border">
                  <p className="text-lg text-gray-700">{summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSummarySection;
