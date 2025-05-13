import React from "react";
import Wordcloud from "./Wordcloud";
import useContainerSize from "./useContainerSize";

const WordcloudSection = ({ words }) => {
  const [containerRef, size] = useContainerSize();
  
  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto container p-4 space-y-8">
        <div className="text-5xl md:text-6xl font-bold text-center flex-col text-slate-950">
          <div>WORDCLOUD</div>
        </div>
        <div ref={containerRef} className="bg-white shadow rounded-xl p-4 flex items-center justify-center overflow-x-auto h-[600px] w-full cursor-default border">
          {size.width > 0 && size.height > 0 && (
            <Wordcloud
              words={words}
              width={size.width}
              height={size.height}
              minFont={14}
              maxFont={64}
              maxWords={100}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WordcloudSection;
