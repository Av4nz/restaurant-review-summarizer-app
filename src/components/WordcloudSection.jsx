import React from "react";
import Wordcloud from "./Wordcloud";
import useContainerSize from "./useContainerSize";

const WordcloudSection = ({ wordclouds, labels, colors }) => {
  const [containerRef, size] = useContainerSize();

  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto container p-4 space-y-8">
        <div className="flex flex-col gap-8 items-center justify-center">
          {wordclouds.map((words, idx) => (
            <div
              key={labels[idx]}
              className="flex flex-col items-center w-full"
            >
              <div className={`mb-2 font-semibold text-2xl ${colors[idx]}`}>
                {labels[idx]}
              </div>
              <div
                ref={idx === 0 ? containerRef : undefined}
                className="bg-white shadow rounded-xl p-4 flex items-center justify-center overflow-x-auto h-[400px] w-full cursor-default border"
                style={{ minWidth: 300, minHeight: 200 }}
              >
                {size.width > 0 && size.height > 0 && (
                  <Wordcloud
                    words={words}
                    width={size.width}
                    height={size.height}
                    minFont={12}
                    maxFont={64}
                    maxWords={100}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordcloudSection;
