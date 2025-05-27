import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FilterSection from "../components/FilterSection";
import WordcloudSection from "../components/WordcloudSection";
import DiagramSection from "../components/DiagramSection";
import TextSummarySection from "../components/TextSummarySection";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import api from "../api.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Summary = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const canAccess = localStorage.getItem("canAccessSummary");
    if (!canAccess) {
      navigate("/");
    }
  });

  const [showSections, setShowSections] = useState(false);
  const [showSectionItems, setShowSectionItems] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [data, setData] = useState({
    positiveWordcloud: [],
    neutralWordcloud: [],
    negativeWordcloud: [],
    positiveDiagram: [],
    neutralDiagram: [],
    negativeDiagram: [],
    positiveSummary: "",
    negativeSummary: "",
    neutralSummary: "",
  });

  const wordcloudRef = useRef();
  const diagramRef = useRef();
  const textSummaryRef = useRef();

  const fetchData = async () => {
    try {
      const response = await api.get("/summary-results");
      const { summary, positive, negative, neutral } =
        response.data.summary_results;

      const positiveWordcloud = (positive?.keywords || []).map((item) => ({
        text: item.keyword,
        value: item.count,
      }));
      const negativeWordcloud = (negative?.keywords || []).map((item) => ({
        text: item.keyword,
        value: item.count,
      }));
      const neutralWordcloud = (neutral?.keywords || []).map((item) => ({
        text: item.keyword,
        value: item.count,
      }));
      const positiveDiagram = (positive?.keywords || []).map((item) => ({
        keyword: item.keyword,
        count: item.count,
      }));
      const negativeDiagram = (negative?.keywords || []).map((item) => ({
        keyword: item.keyword,
        count: item.count,
      }));
      const neutralDiagram = (neutral?.keywords || []).map((item) => ({
        keyword: item.keyword,
        count: item.count,
      }));

      setData({
        positiveWordcloud,
        negativeWordcloud,
        neutralWordcloud,
        positiveDiagram,
        negativeDiagram,
        neutralDiagram,
        positiveSummary: summary?.positive || "",
        negativeSummary: summary?.negative || "",
        neutralSummary: summary?.neutral || "",
      });
      setShowSectionItems(true);
      setAlert({
        show: true,
        type: "success",
        message: "Data fetched successfully",
      });
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        message: "Error fetching data: " + error.message,
      });
    }
  };

  const wordclouds = [];
  const diagrams = [];
  const summaries = [];
  const sentimentLabels = [];
  const sentimentColors = [];

  if (data.positiveWordcloud && data.positiveWordcloud.length > 0) {
    wordclouds.push(data.positiveWordcloud);
    diagrams.push(data.positiveDiagram);
    summaries.push(data.positiveSummary);
    sentimentLabels.push("Positive");
    sentimentColors.push("text-green-700");
  }
  if (data.negativeWordcloud && data.negativeWordcloud.length > 0) {
    wordclouds.push(data.negativeWordcloud);
    diagrams.push(data.negativeDiagram);
    summaries.push(data.negativeSummary);
    sentimentLabels.push("Negative");
    sentimentColors.push("text-red-700");
  }
  if (data.neutralWordcloud && data.neutralWordcloud.length > 0) {
    wordclouds.push(data.neutralWordcloud);
    diagrams.push(data.neutralDiagram);
    summaries.push(data.neutralSummary);
    sentimentLabels.push("Neutral");
    sentimentColors.push("text-gray-700");
  }

  const handleApplySummarize = () => {
    setShowSections(true);
    fetchData();
  };

  const handleCloseSnackbar = () => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4"); // Create a new PDF

    // Helper function to add a section to the PDF
    const addSectionToPDF = async (ref) => {
      const element = ref.current;
      const canvas = await html2canvas(element, { scale: 1.5 }); // Capture as canvas
      const imgData = canvas.toDataURL("image/png"); // Convert to image
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight); // Add image to PDF
    };

    // Add Wordcloud section
    await addSectionToPDF(wordcloudRef);

    // Add a new page for the Diagram section
    pdf.addPage();
    await addSectionToPDF(diagramRef);

    // Add a new page for the Text Summary section
    pdf.addPage();
    await addSectionToPDF(textSummaryRef);

    // Save the PDF
    pdf.save("summary.pdf");
  };

  return (
    <div>
      <FilterSection onApplySummarize={handleApplySummarize} />
      {showSections && (
        <>
          <div>
            <div className="bg-slate-50" ref={wordcloudRef}>
              <div className="text-5xl md:text-6xl font-bold text-center flex-col text-slate-950">
                <div>WORDCLOUD</div>
              </div>
              {!showSectionItems && (
                <div className="flex items-center justify-center py-10">
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress size={120} />
                  </Box>
                </div>
              )}
              {showSectionItems && wordclouds.length > 0 && (
                <WordcloudSection
                  wordclouds={wordclouds}
                  labels={sentimentLabels}
                  colors={sentimentColors}
                />
              )}
            </div>
            <div className="bg-slate-50" ref={diagramRef}>
              <div className="text-5xl md:text-6xl font-bold text-center flex-col text-slate-950">
                <div>DIAGRAM</div>
              </div>
              {!showSectionItems && (
                <div className="flex items-center justify-center py-10">
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress size={120} />
                  </Box>
                </div>
              )}
              {showSectionItems && diagrams.length > 0 && (
                <DiagramSection
                  diagrams={diagrams}
                  labels={sentimentLabels}
                  colors={sentimentColors}
                />
              )}
            </div>
            <div className="bg-slate-50" ref={textSummaryRef}>
              <div className="text-5xl md:text-6xl font-bold text-center flex-col text-slate-950">
                <div>TEXT SUMMARY</div>
              </div>
              {!showSectionItems && (
                <div className="flex items-center justify-center py-10">
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress size={120} />
                  </Box>
                </div>
              )}
              {showSectionItems && summaries.length > 0 && (
                <TextSummarySection
                  summaries={summaries}
                  labels={sentimentLabels}
                  colors={sentimentColors}
                />
              )}
            </div>
          </div>
          {showSectionItems && (
            <div className="flex items-center justify-center bg-slate-50 py-8">
              <Button onClick={handleDownloadPDF}>Download as PDF</Button>
            </div>
          )}
        </>
      )}
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

export default Summary;
