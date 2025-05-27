import React, { useState } from "react";
import Button from "../components/Button";
import LoadingModal from "../components/LoadingModal";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState("")
  const [alert, setAlert] = useState({show: false, type: "success", message: ""});
  const navigate = useNavigate();

  async function scrapeAndAnalayze(url) {
    setIsModalOpen(true);
    setAlert({ show: false, type: "success", message: "" });
    try {
      const response = await api.post("/scrape", { url });
      if (response.data.status === "success") {
        setAlert({ show: true, type: "success", message: "Scraping and Analysis successful" });
        localStorage.setItem("canAccessSummary", "true");
        setIsModalOpen(false);
        setTimeout(() => {
          setAlert({ show: false, type: "success", message: "" });
          navigate("/summary");
        }, 1000);
      } else {
        setAlert({ show: true, type: "error", message: "Scraping and analysis failed: " + response.data.message });
        setIsModalOpen(false);
      }
    } catch (error) {
      setAlert({ show: true, type: "error", message: error.message });
      setIsModalOpen(false);
    }
  }

  const handleScrape = () => {
    if (!url) {
      setAlert({ show: true, type: "warning", message: "Please enter a valid URL" });
      return;
    }
    scrapeAndAnalayze(url);
  };

  const handleCloseSnackbar = () => {
    setAlert(prev => ({ ...prev, show: false }));
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
      <Snackbar
        open={alert.show}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alert.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
