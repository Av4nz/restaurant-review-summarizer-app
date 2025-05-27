import React, { useState } from "react";
import Button from "../components/Button";
import LoadingModal from "../components/LoadingModal";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState("")
  const navigate = useNavigate();

  async function scrapeAndAnalayze(url) {
    setIsModalOpen(true);
    try {
      const response = await api.post("/scrape", { url });
      if (response.data.status === "success") {
        alert("Scraping and Analysis successful")
        setIsModalOpen(false);
        navigate("/summary");
      } else {
        alert("Scraping and analysis failed: " + response.data.message);
        setIsModalOpen(false);
      }
    } catch (error) {
      alert(error.message);
      setIsModalOpen(false);
    }
  }

  const handleScrape = () => {
    if (!url) {
      alert("Please enter a valid URL");
      return;
    }
    scrapeAndAnalayze(url);
    console.log(url);
  };

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
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={handleScrape}>Scrape</Button>
          <LoadingModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
