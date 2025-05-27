import React, { useRef, useState, useEffect } from "react";
import Button from "../components/Button";
import FilterSection from "../components/FilterSection";
import WordcloudSection from "../components/WordcloudSection";
import DiagramSection from "../components/DiagramSection";
import TextSummarySection from "../components/TextSummarySection";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import api from "../api.js";

const Summary = () => {
  const [showSections, setShowSections] = useState(false);
  const [data, setData] = useState({
    positiveWordcloud: [],
    neutralWordcloud: [],
    negativeWordcloud: [],
    positiveDiagram: [],
    neutralDiagram: [],
    negativeDiagram: [],
    textSummary: "",
  });

  const wordcloudRef = useRef();
  const diagramRef = useRef();
  const textSummaryRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/summary-results");
        const { summary, positive, negative, neutral } = response.data.summary_results;

        const positiveWordcloud = (positive?.keywords || []).map(item => ({
        text: item.keyword,
        value: item.count,
      }));
      const negativeWordcloud = (negative?.keywords || []).map(item => ({
        text: item.keyword,
        value: item.count,
      }));
      const neutralWordcloud = (neutral?.keywords || []).map(item => ({
        text: item.keyword,
        value: item.count,
      }));
      const positiveDiagram = (positive?.keywords || []).map(item => ({
        keyword: item.keyword,
        count: item.count,
      }));
      const negativeDiagram = (negative?.keywords || []).map(item => ({
        keyword: item.keyword,
        count: item.count,
      }));
      const neutralDiagram = (neutral?.keywords || []).map(item => ({
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
          textSummary: summary[0] || "",
        });
        setShowSections(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
      <FilterSection />
      {showSections && (
        <>
          <div>
            <div ref={wordcloudRef}>
              <WordcloudSection wordclouds={[data.positiveWordcloud, data.negativeWordcloud, data.neutralWordcloud]} />
            </div>
            <div ref={diagramRef}>
              <DiagramSection diagrams={[data.positiveDiagram, data.negativeDiagram, data.neutralDiagram]} />
            </div>
            <div ref={textSummaryRef}>
              <TextSummarySection text={data.textSummary} />
            </div>
          </div>
          <div className="flex items-center justify-center bg-slate-50 py-8">
            <Button onClick={handleDownloadPDF}>Download as PDF</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Summary;
