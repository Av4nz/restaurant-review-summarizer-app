import React, { useState } from "react";
import Button from "../components/Button";
import LoadingModal from "../components/LoadingModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrapingComplete, setIsScrapingComplete] = useState(false);
  const navigate = useNavigate();

  const handleScrape = () => {
    setIsModalOpen(true);
    setIsScrapingComplete(false);
  };

  const handleScrapingComplete = () => {
    setIsScrapingComplete(true);
    setIsModalOpen(false);
    navigate("/summary");
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50 flex-col">
      <div className="container p-4 space-y-8">
        <div className="text-5xl md:text-6xl font-bold text-center flex-col text-slate-950">
          <div>RESTAURANT REVIEW</div>
          <div>SUMMARIZER</div>
        </div>
        <div className="text-center text-slate-950">
          <p>
            Summarize your restaurant reviews to effortlessly uncover key
            insights, popular menu items, and overall customer impressions. Get
            a clear, concise overview with word clouds, visual diagrams, and a
            structured text summary—all in just a few clicks.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <input
            className="bg-white border border-black rounded-full h-14 p-4 w-full md:w-[75%]"
            type="text"
            placeholder="Input GMaps Reviews link here"
          />
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={handleScrape}>Scrape</Button>
          <LoadingModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}
          onScrapingComplete={handleScrapingComplete}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
